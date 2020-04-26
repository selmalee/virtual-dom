import MyReactDom from '../lib/MyReactDom'
import { doms } from '../utils/doms'

let allPatches:any[]
let index = 0

function patch(patches:any[]) {
  allPatches = patches
  walk(doms) // 递归节点打补丁
}

function walk(node:HTMLElement|Text) {
  let current = allPatches[index++]
  let childNodes = node.childNodes
  // 递归子节点
  childNodes.forEach((child:any) => {
    walk(child)
  })
  // 打补丁
  if (current) {
    doPatch(node, current)
  }
}

function doPatch(node:HTMLElement|Text, patches:any[]) {
  patches.forEach(patch => {
    switch(patch.type) {
      // 删除节点
      case 'REMOVE':
        if (node.parentNode) {
          node.parentNode.removeChild(node)
        } else {
          throw new Error('node.parentNode is null')
        }
        break
      // 文本节点
      case 'TEXT':
        node.textContent = patch.text
        break
      // 属性改变
      case 'ATTR':
        if (node instanceof HTMLElement) {
          for (let k in patch.attr) {
            const val = patch.attr[k]
            if (val) {
              MyReactDom.setAttr(node, k, val)
            } else {
              node.removeAttribute(k)
            }
          }
        }
        break
      // 替换节点
      case 'REPLACE':
        if (node.parentNode) {
          const newNode = MyReactDom.renderDom(patch.newNode)
          node.parentNode.replaceChild(newNode, node)
        } else {
          throw new Error('node.parentNode is null')
        }
        break
      default:
        break
    }
  })
}

export default patch

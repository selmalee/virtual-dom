import { isString } from "."
import MyElement from '../lib/MyElement'

// 所有都基于一个序号来实现
let index = 0;

/**
 * 比较新旧树
 * @param {MyElement} oldTree
 * @param {MyElement} newTree
 * @returns
 */
function diff(oldTree: MyElement|string, newTree: MyElement|string|undefined) {
  let patches:any[] = [] // 存放补丁
  treeWalker(oldTree, newTree, index, patches) // 递归树，比较后的结果放到补丁里
  return patches
}

function treeWalker(oldNode: MyElement|string, newNode: MyElement|string|undefined, index: number, patches: any[]) {
  let current:object[] = [] // 当前元素的补丁
  // 删除节点
  if (!newNode) {
    current.push({type: 'REMOVE', index})
  // 文本节点
  } else if (isString(oldNode) && isString(newNode)) {
    if (oldNode !== newNode) {
      current.push({ type: 'TEXT', text: newNode})
    }
  // 属性改变
  } else if (oldNode instanceof MyElement && newNode instanceof MyElement && oldNode.type === newNode.type) {
    let attr = diffAttr(oldNode.props, newNode.props)
    if(Object.keys(attr).length > 0) {
      current.push({ type: 'ATTR', attr })
    }
    if (oldNode.children && oldNode.children.length) {
      diffChildren(oldNode.children, newNode.children, patches)
    }
  // 节点类型不一致，替换节点
  } else {
    current.push({ type: 'REPLACE', newNode })
  }

  // 加入到补丁数组
  if (current.length) {
    patches[index] = current
  }
}

/**
 * 比较节点属性，返回合并后的新属性对象
 * @param {*} oldAttrs
 * @param {*} newAttrs
 * @returns
 */
function diffAttr(oldAttrs: any, newAttrs: any) {
  let patch:any = {};
  // 判断已有属性是否修改
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]
    }
  }
  // 判断是否有新属性
  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch
}

function diffChildren(oldChildren: (MyElement|string)[], newChildren: (MyElement|string)[]|undefined, patches: any[]) {
  // 比较子节点
  oldChildren.forEach((child, i) => {
    treeWalker(child, newChildren && newChildren[i], ++index, patches)
  })
}


export default diff

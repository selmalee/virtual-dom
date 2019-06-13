import MyElement from './MyElement'
import { changeDoms } from '../utils/doms'

const MyReactDom = {
  render(nodeObj: MyElement, target: any) {
    const node = this.renderDom(nodeObj)
    changeDoms(node)
    if (target instanceof HTMLElement) {
      target.appendChild(node)
    } else {
      throw new Error('target node is null')
    }
  },
  setAttr(node:HTMLElement, k:any, val:any) {
    switch(k) {
      case 'className':
        node.className = val
        break
      case 'style':
        node.style.cssText = val
        break
      default:
        node.setAttribute(k, val)
        break
    }
  },
  // 将虚拟DOM转化成真实DOM
  renderDom(nodeObj: MyElement):HTMLElement|Text {
    let node = document.createElement(nodeObj.type)
    // 设置属性
    for (let k in nodeObj.props) {
      const val = nodeObj.props[k]
      this.setAttr(node, k, val)
    }
    // 遍历子节点
    if (nodeObj.children) {
      nodeObj.children.forEach((child: MyElement|string) => {
        const childNode = child instanceof MyElement ? this.renderDom(child) : document.createTextNode(child)
        node.appendChild(childNode)
      })
    }
    return node
  }
}

export default MyReactDom

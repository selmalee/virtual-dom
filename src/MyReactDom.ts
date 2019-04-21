import Element from './Element';

const MyReactDom = {
  // 将虚拟DOM转化成真实DOM
  render(nodeObj: Element, target: any) {
    const node = renderDom(nodeObj)
    target.appendChild(node)
  }
}

function renderDom(nodeObj: Element) {
  const node = document.createElement(nodeObj.type)
  // 设置属性
  for (let k in nodeObj.props) {
    const val = nodeObj.props[k]
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
  }
  // 遍历子节点
  if (nodeObj.children) {
    nodeObj.children.forEach((child: Element|string) => {
      const childNode = child instanceof Element ? renderDom(child) : document.createTextNode(child)
      node.appendChild(childNode)
    })
  }
  return node
}

export default MyReactDom

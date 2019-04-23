import MyElement from './MyElement'

const MyReactDom = {
  // 将虚拟DOM转化成真实DOM
  render(nodeObj: MyElement, target: any) {
    const node = renderDom(nodeObj)
    target.appendChild(node)
  }
}

function renderDom(nodeObj: MyElement) {
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
    nodeObj.children.forEach((child: MyElement|string) => {
      const childNode = child instanceof MyElement ? renderDom(child) : document.createTextNode(child)
      node.appendChild(childNode)
    })
  }
  return node
}

export default MyReactDom

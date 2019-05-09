import MyElement from './MyElement'

function render(node: HTMLElement|Text, target: any) {
  if (target instanceof HTMLElement) {
    target.appendChild(node)
  } else {
    throw new Error('target node is null')
  }
}

function setAttr(node:HTMLElement, k:any, val:any) {
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

// 将虚拟DOM转化成真实DOM
function renderDom(nodeObj: MyElement) {
  let node:HTMLElement|Text
  if (nodeObj instanceof MyElement) {
    node = document.createElement(nodeObj.type)
    // 设置属性
    for (let k in nodeObj.props) {
      const val = nodeObj.props[k]
      setAttr(node, k, val)
    }
    // 遍历子节点
    if (nodeObj.children) {
      nodeObj.children.forEach((child: MyElement|string) => {
        const childNode = child instanceof MyElement ? renderDom(child) : document.createTextNode(child)
        node.appendChild(childNode)
      })
    }
  } else {
    node = document.createTextNode(nodeObj)
  }
  return node
}

export default { render, setAttr, renderDom }

import { isString } from "./utils";

/**
 * 比较新旧树
 * @param {MyElement} oldTree
 * @param {MyElement} newTree
 * @returns
 */
function diff(oldTree: MyElement, newTree: MyElement) {
  let patches = {} // 存放补丁
  const index = 0
  treeWalker(oldTree, newTree, index, patches) // 递归树，比较后的结果放到补丁里
  return patches
}

function treeWalker(oldNode: MyElement|string, newNode: MyElement|string|undefined, index: number, patches: any) {
  let current:object[] = [] // 当前元素的补丁
  if (!newNode) {
    // 删除
    current.push({type: 'REMOVE', index})
  } else if (isString(oldNode) && isString(newNode)) {
    // 比较文本是否一致
    if (oldNode !== newNode) {
      current.push({ type: 'TEXT', text: newNode})
    }
  } else if (oldNode instanceof MyElement && newNode instanceof MyElement && oldNode.type === newNode.type) {
    // 比较属性是否一致
    let attr = diffAttr(oldNode.props, newNode.props)
    if(Object.keys(attr).length > 0) {
      current.push({ type: 'ATTR', attr })
    }
    // 遍历子节点
    if (oldNode.children && oldNode.children.length) {
      diffChildren(oldNode.children, newNode.children, patches)
    }
  } else {
    // 节点完全被替换
    current.push({ type: 'REPLACE', newNode })
  }

  // 加入到补丁数组
  if (current.length) {
    patches[index] = current
  }
}

/**
 * 比较节点属性
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

// 所有都基于一个序号来实现
let num = 0;

function diffChildren(oldChildren: (MyElement|string)[], newChildren: (MyElement|string)[]|undefined, patches: any[]) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((child, index) => {
    treeWalker(child, newChildren && newChildren[index], ++num, patches)
  })
}


export default diff

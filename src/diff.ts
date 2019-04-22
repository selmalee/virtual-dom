// 比较新旧树
function diff(oldTree, newTree) {
  let patches = {} // 存放补丁
  let index = 0
  treeWalker(oldTree, newTree, index, patches) // 递归树，比较后的结果放到补丁里
  return patches
}

function treeWalker(oldNode, newNode, index, patches) {
  
}
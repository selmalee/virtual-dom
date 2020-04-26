import MyReact from './lib/MyReact'
import MyReactDom from './lib/MyReactDom'
import diff from './utils/diff'
import patch from './utils/patch'
import './index.css'

try {
  // 1. 用JS对象模拟DOM（虚拟DOM）
  const obj = MyReact.createElement('ul', { className: 'list-group' }, [
      MyReact.createElement('li', { className: 'item' }, ['周杰伦']),
      MyReact.createElement('li', { className: 'item' }, ['林俊杰']),
      MyReact.createElement('li', { className: 'item' }, ['王力宏'])
    ]
  )
  // 2. 把此虚拟DOM转成真实DOM并插入页面中（render）
  MyReactDom.render(obj, document.getElementById('root'))
  
  // 3. 如果有事件发生修改了虚拟DOM，比较两棵虚拟DOM树的差异，得到差异对象（补丁数组）（diff）
  const newObj = MyReact.createElement('ul', { className: 'list' }, [
    MyReact.createElement('li', { className: 'item active' }, ['蔡徐坤']),
    MyReact.createElement('li', { className: 'item' }, ['林俊杰'])
  ])
  const patches = diff(obj, newObj)
  // 4. 把差异对象（补丁数组）应用到真正的DOM树上（patch）
  patch(patches)
} catch(e) {
  console.log(e.toString())
}

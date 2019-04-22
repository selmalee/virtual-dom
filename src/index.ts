// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

// 1. 用JS对象模拟DOM（虚拟DOM）
// 2. 把此虚拟DOM转成真实DOM并插入页面中（render）
// 3. 如果有事件发生修改了虚拟DOM，比较两棵虚拟DOM树的差异，得到差异对象（diff）
// 4. 把差异对象应用到真正的DOM树上（patch）

import MyReact from './MyReact'
import MyReactDom from './MyReactDom'
import './index.css'
import * as serviceWorker from './serviceWorker';

const doms = MyReact.createElement('ul', { className: 'list' }, [
    MyReact.createElement('li', { className: 'item' }, ['周杰伦']),
    MyReact.createElement('li', { className: 'item' }, ['林俊杰']),
    MyReact.createElement('li', { className: 'item' }, ['王力宏'])
  ]
)
MyReactDom.render(doms, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

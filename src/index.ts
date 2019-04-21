// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import MyReact from './MyReact'
import MyReactDom from './MyReactDom'
import './index.css'

const doms = MyReact.createElement('ul', { className: 'list' }, [
    MyReact.createElement('li', { className: 'item' }, ['周杰伦']),
    MyReact.createElement('li', { className: 'item' }, ['林俊杰']),
    MyReact.createElement('li', { className: 'item' }, ['王力宏'])
  ]
)
MyReactDom.render(doms, document.getElementById('root'))

// function create() {
//   return <ul className="list">
//     <li>周杰伦</li>
//   </ul>
// }
// console.log(create())

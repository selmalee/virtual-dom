/// <reference types="react-scripts" />

// 虚拟DOM元素的类，构建实例对象，用来描述DOM
declare interface MyElement {
  type: string
  props: any
  children?: (MyElement|string)[]
  constructor(type: string, props: any, children?: (MyElement|string)[]):void
}

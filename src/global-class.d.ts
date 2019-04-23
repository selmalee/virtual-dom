// 虚拟DOM元素的类，构建实例对象，用来描述DOM
declare class MyElement {
  type: string
  props: any
  children?: (MyElement|string)[]
  constructor(type: string, props: any, children?: (MyElement|string)[]):void
}

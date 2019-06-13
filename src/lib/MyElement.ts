// 虚拟DOM元素的类，构建实例对象，用来描述DOM
class MyElement {
  type: string
  props: any
  children?: (MyElement|string)[]
  constructor(type: string, props: any, children?: (MyElement|string)[]) {
    this.type = type
    this.props = props
    this.children = children
  }
}

export default MyElement

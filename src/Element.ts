// 虚拟DOM元素的类，构建实例对象，用来描述DOM
class Element {
  type: string
  props: any
  children?: (Element|string)[]
  constructor(type: string, props: any, children?: (Element|string)[]) {
    this.type = type
    this.props = props
    this.children = children
  }
}

export default Element

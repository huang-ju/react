// 过transform-react-jsx插件来设置解析 JSX 之后调用的函数，
// 默认解析为调用 React.createElement()
// 所以这就是为什么虽然在 JSX 代码中没有使用到 React，却仍然需要导入它

import Component from './component.js'
import createElement from './create-element.js'

export default {
    Component,
    createElement
}
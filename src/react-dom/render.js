import Component from '../react/component'
import { setAttribute } from './dom'


/**
 * 创建组件
 * @param {*} component 组件
 * @param {*} props 传入组件的数据
 */
function createComponent(component, props) {
  let init = {}
  // 如果是类定义组件,直接返回实例
  if (component.prototype && component.prototype.render) {
    init = new component(props);
  } else {
    // 如果是函数定义组件,把它变为类组件
    init = new Component(props)
    // 而这个对象实际上的构造方法应该是函数名 , 也就是component
    // init = cons
    init.render = function () {
      return component(props)
    }
  }
  return init;
}

/**
 * 更新props
 * @param {*} component 
 * @param {*} props 
 */
function setComponentProps(component, props) {
  if (!component.base) {
    // 组件即将被渲染到页面之前触发
    component.componentWillMount && component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    // 如果有componentWillReceiveProps生命周期
    component.componentWillReceiveProps(props);
  }
  renderComponent(component);
}

/**
 * 渲染组件
 * @param {*} component 
 */
export function renderComponent(component) {
  // base的作用:保存组件实例最终渲染出来的DOM && 判断是否渲染了
  // component.base保存的是组件的dom对象
  // base._component保存的是dom对象所对应的组件
  // 为了把他们关联起来
  let base;

  const renderer = component.render();
  console.log('renderer', renderer)

  if (component.base && component.componentWillUpdate) {
    // 组件即将被更新时触发
    component.componentWillUpdate();
  }

  // 递归处理
  base = _render(renderer);
  console.log('renderer', renderer, component)

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    // 组件已经被渲染到页面中后触发
    component.componentDidMount();
  }

  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }

  component.base = base;
  base._component = component;
}

/**
 * 渲染Render
 * @param {*} vnode 虚拟DOM
 */
function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';

  // 如果是数字,把数字转为字符串处理
  if (typeof vnode === 'number') vnode = String(vnode);

  // 当vnode为字符串时，渲染结果是一段文本
  if (typeof vnode === 'string') {
    let textNode = document.createTextNode(vnode);
    return textNode;
  }

  // 如果是函数则是组件
  if (typeof vnode.tag === 'function') {
    // 创建组件
    const component = createComponent(vnode.tag, vnode.attrs);
    console.log('component', component)
    // 设置组件 props
    setComponentProps(component, vnode.attrs);

    return component.base;
  }

  // 添加虚拟DOM的节点
  const dom = document.createElement(vnode.tag);
  // 如果vnode有属性,把当前创建出来的dom设置属性
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      // 获取属性值
      const value = vnode.attrs[key];
      // 设置属性
      setAttribute(dom, key, value);
    });
  }

  //如果只是普通标签,递归渲染子节点,把子节点挂载在父节点
  if (vnode.children) {
    vnode.children.forEach(child => render(child, dom));
  }
  // 把返回结果挂载到真实DOM
  return dom;
}


export function render(vnode, container) {
  container.innerHTML = '';
  return container.appendChild(_render(vnode));
}
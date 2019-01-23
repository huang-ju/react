const React = {
  createElement
}

const ReactDOM = {
  render: (vnode, container) => {
    // 清除需要挂载DOM上的节点,否则会一直添加
    container.innerHTML = '';
    return render(vnode, container);
  }
}

function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children
  }
}

/**
 * 渲染Render
 * @param {*} vnode 虚拟DOM
 * @param {*} container 挂载的真实DOM
 */
function render(vnode, container) {
  // 当vnode为字符串时，渲染结果是一段文本
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  }

  // 添加虚拟DOM的节点
  const dom = document.createElement(vnode.tag);

  // 如果vnode有属性
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      // 获取属性值
      const value = vnode.attrs[key];
      // 设置属性
      setAttribute(dom, key, value);
    })
  }
  // 递归渲染子节点,把子节点挂载在父节点
  vnode.children.forEach(child => render(child, dom))
  // 把返回结果挂载到真实DOM
  return container.appendChild(dom)
}

/**
 * 设置属性值
 * @param {*} dom DOM
 * @param {*} key 属性名
 * @param {*} value 属性值
 */
function setAttribute(dom, key, value) {
  if (key === 'className') {
    // 如果属性名是className，则改回class
    key = className;
  } else if (/on\w+/.test(name)) {
    // 如果是事件监听
    name = name.toLowerCase();
    dom[name] = value || '';
  } else if (key === 'style') {
    // 如果是样式
    // 值为空 或者 值为字符串
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value || typeof value === 'object') {
      for (let name in value) {
        // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
        dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name];
      }
    }
  } else {
    // 普通属性
    if (name in dom) {
      dom[name] = value || '';
    }
    if (value) {
      dom.setAttribute(ame, value);
    } else {
      dom.removeAttribute(name);
    }
  }
}


function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在时间 {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

time && clearInterval(time)
const time = setInterval(tick, 1000);

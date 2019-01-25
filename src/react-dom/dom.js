/**
 * 设置属性值
 * @param {*} dom DOM
 * @param {*} key 属性名
 * @param {*} value 属性值
 */
export function setAttribute(dom, key, value) {
  if (key === 'className') {
    // 如果属性名是className，则改回class
    key = 'class';
  } else if (/on\w+/.test(key)) {
    // 如果是事件监听
    key = key.toLowerCase();
    dom[key] = value || '';
  } else if (key === 'style') {
    // 如果是样式
    // 值为空 或者 值为字符串
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && typeof value === 'object') {
      for (let key in value) {
        // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
        dom.style[key] = typeof value[key] === 'number' ? value[key] + 'px' : value[key];
      }
    }
  } else {
    // 普通属性
    if (key in dom) {
      dom[key] = value || '';
    }
    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

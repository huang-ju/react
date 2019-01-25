import { renderComponent } from '../react-dom/render';

class Component {
  // 通过继承Component都有自己的state
  // props来接受传入值
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }

  setState(change) {
    // 把改变的state跟this.state合并
    Object.assign(this.state, change);
    // 每次setState改变后重新渲染
    renderComponent(this)
  }
}

export default Component;

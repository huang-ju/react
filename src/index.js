import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    }
  }

  onClick() {
    this.setState({ num: this.state.num + 1 });
  }

  Hello() {
    return <div><p>Hello</p></div>
  }

  render() {
    return (
      <div>
        {this.Hello()}
        <h1>count: {this.state.num}</h1>
        <button onClick={() => this.onClick()}>add</button>
      </div>
    );
  }
}

function Welcome(props) {
  return <div>
    <h1>
      <p>Hello</p>
    </h1>
    <h2>World</h2>
  </div>;
}

ReactDOM.render(
  <Welcome />,
  document.getElementById('root')
);
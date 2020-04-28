import React, { Component } from 'react';
import classnames  from 'classnames';
import './home.styl';

 
export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: "首页"
    }
  }

  componentWillMount() { // 组件挂载前触发

  }

  componentDidMount() { // 组件挂载后触发
    this.setState((state) => ({
      title: state.title + "欢迎您"
    }))
  }

  componentWillReceivePorps(nextProps) { // 接收到新的props时触发

  }

  shouldComponentUpdate(nextProps, nextState) { // 组件Props或者state改变时触发，true：更新，false：不更新
    return true
  }

  componentWillUpdate(nextProps, nextState) { // 组件更新前触发

  }

  componentDidUpdate() { // 组件更新后触发

  }
  
  componentWillUnmount() { // 组件卸载时触发

  }

  render(){
    const { title } = this.state;
    return (
      <div className="home">
        <div className={classnames("title", title && "title-color")}>{title}</div>
      </div>
    );
  }
}


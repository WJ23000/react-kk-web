import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import classnames  from 'classnames';
import { getUserInfo, editUserInfo } from "../../services/index";
import './welcome.styl';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      value: 123
    }
  }

  componentDidMount() {
    this.setState({
      title: "欢迎您"
    })
    // 获取用户信息
    getUserInfo("user").then((res) => {
      console.log("用户信息", res);
    })
    // 编辑用户信息
    let params = {
      type: "user",
      id: "0001"
    }
    editUserInfo(params).then((res) => {
      console.log("编辑返回", res);
    })
  }

  toParamsClick(value) {
    this.props.history.push({
      pathname: '/detail',
      state: { id: value, type: "456" }
    })
  }

  render() {
    const { title, value } = this.state;
    return (
      <div className="welcome">
        {title ? <div className="title-red">{title}</div> : <div className="title-blue">{title}</div>}
        <div className="tz-content">
          <div className="tz-btn" onClick={this.toParamsClick.bind(this, value)}>点击传值</div>
          <div className="tz-btn"><Link to={{ pathname: '/detail', state: { id: value } }}>路由导航</Link></div>
        </div>
      </div>
    );
  }
}
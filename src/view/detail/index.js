import React, { Component } from 'react';
// import classnames  from 'classnames';
import './detail.styl';

 
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const {id,type} = this.props.history.location.state
    console.log("接收到的值", id, type);
  }

  render(){
    return (
      <div className="detail">
        <div>详情</div>
      </div>
    );
  }
}

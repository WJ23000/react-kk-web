import React, { Component } from 'react'; 

//引入需要用到的页面组件 
import Welcome from '../view/welcome/index';
import Home from '../view/home/index';
import About from '../view/about/index';
import Map from '../view/map/index';
import Detail from '../view/detail/index';

//引入一些模块
import { HashRouter as Router, Route} from "react-router-dom";
import createHistory from 'history/createHashHistory'
const history = createHistory()


export default class router extends Component {
    render(location ){
        return (
            <Router history={history}>
                <Route location={location} exact path="/" component={Welcome} />
                <Route location={location} path="/home" component={Home} />
                <Route location={location} path="/about" component={About} />
                <Route location={location} path="/map" component={Map} />
                <Route location={location} path="/detail" component={Detail} />
            </Router>
        );
    }
}
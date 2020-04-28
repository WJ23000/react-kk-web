import axios from 'axios';
import QS from 'qs';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/jsonp'
        }
        if(token){
          config.params = {'token':token}
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.errCode === 533) {
            this.props.history.push({
                pathname: '/login',
                state: { }
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
*/
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: QS.stringify(params)
        }).then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}

/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
*/
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}
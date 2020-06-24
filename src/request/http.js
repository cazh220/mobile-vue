import axios from 'axios'
import Qs from 'qs'
import store from '../store/index'
import { Toast } from 'vant'
import router from '../router'

axios.defaults.baseURL = 'http://laravel2.cc'
//超时
axios.defaults.timeout = 5000

//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//urlencoded 不能少一个末尾的d
//请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token.access_token
        console.log('token', store.state.token)
        //此处做token刷新和过期判断
        token && (config.headers.Authorization = store.state.token.token_type + ' ' + token)
        console.log('请求拦截器', config)
        return config
    }, error => {
        return Promise.error(error)
    }
)

//响应拦截器
axios.interceptors.response.use(
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    response => {
        console.log('响应拦截器')
        if (response.data.code === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    }, 
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        console.log('响应拦截器抛异常', error)
        // console.log('响应拦截器抛异常1', error.response)
        //状态码非200的情形
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录    
                // 未登录则跳转登录页面，并携带当前页面的路径    
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    break;
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    //清除token
                    localStorage.removeItem('token')
                    store.commit('loginSuccess', null)
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }, 1000);
                    break;
                case 404:
                    Toast({
                        message: '请求的页面不存在',
                        duration: 2000,
                        forbidClick: true
                    });
                    break;
                default:
                    Toast({
                        message: error.response.data,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response)
        }
    }
);

//GET请求 参数：params 
export function get(url, params){
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

//POST请求  参数：params
export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, Qs.stringify(params))
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

//上传请求  参数：formData
export function upload(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

//封装patch请求  参数:params
export function patch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, params)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

//封装put请求 参数:params
export function put(url, params = {}){
    return new Promise((resolve, reject) => {
        axios.put(url, params)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}

//封装delete请求  参数:params
export function del(url, params = {}){
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err.data)
        })
    })
}



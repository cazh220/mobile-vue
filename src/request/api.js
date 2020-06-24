import {upload, get, post} from './http'

export const uploadPicture = params => upload('/api/picture', params)

export const getAreaList = params => get('/api/areas', params)//省市区三级联动

export const register = params => post('/api/v1/user', params) //注册用户

export const login = params => post('/api/v1/login', params) //登录用户

// 文章
export const articles = params => get('/api/v1/articles', params) //获取文章
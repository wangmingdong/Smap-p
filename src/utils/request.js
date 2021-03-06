import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=UTF-8;'
  },
  // 其可选项是arraybuffer,blob,document,json,text,stream
  responseType: 'json', // default
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  const token = getToken()
  // 两种方式分开判断，如果是get则加载params上，如果是post加在data上
  if (token) {
    if (config.params) {
      config.params.token = token
    } else {
      config.data.token = token
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
         * code为非200是抛错
         */
    const res = response.data
    if (parseInt(res.code, 10) !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 401:非法的token, 过期了;
      if (res.code === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

import axios from "axios"
import {
  Loading,
  Message
} from "element-ui"
import router from './router';

axios.defaults.baseURL = 'https://www.ruankun.xyz/machinemother' //
//请求拦截
let loading

function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '加载中',
    background: 'rgba(0,0,0,0,7)'
  })
}

function endLoading () { //使用Element loading-close 方法
  loading.close()
}
//请求拦截
axios.interceptors.request.use((config) => {
  startLoading()
  if (localStorage.eleToken) {
    //统一的请求头
    config.headers.token = localStorage.eleToken
  }
  return config
},
  error => {
    return Promise.reject(error)
  })

//响应
axios.interceptors.response.use((response) => {
  endLoading()
  let status = response.data.status
  if (status == 401 || status == 403) {
    Message.error('token 失效,重新登录')
    //清除token
    localStorage.removeItem('eleToken')

    router.push('/login')
  }

  return response
},
  error => {
    endLoading()
    Message.error(error.response.data)
    let status = error.response.status
    console.log(status)
    if (status == 401 || status == 403) {
      Message.error('token 失效,重新登录')
      //清除token
      localStorage.removeItem('eleToken')

      router.push('/login')
    }

    return Promise.reject(error)
  })



export default axios
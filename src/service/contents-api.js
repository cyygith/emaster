import { baseUrl } from '@/config/env'
import axios from './http'

/**
 * article的api
 */
const articleApi = {
  // 获取
  list (params) {
    return axios.post(`${baseUrl}/cArticle/getByExample`, params)
  },
  // 删除
  deleteByIds (params) {
    return axios.post(`${baseUrl}/cArticle/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/cArticle/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/cArticle/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/cArticle/detail`, params)
  },
  //上传图片、附件等
  upload (params) {
    return axios.post(`${baseUrl}/cArticle/uploadImage`, params)
  }
}

export {
  articleApi
}

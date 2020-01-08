import { baseUrl } from '@/config/env'
import axios from './http'

/**
 * account的api
 */
const accountApi = {
  // 获取List
  list (params) {
    return axios.post(`${baseUrl}/accBook/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/accBook/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/accBook/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/accBook/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/accBook/detail`, params)
  }
}

export {
  accountApi
}

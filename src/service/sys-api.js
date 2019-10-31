import { baseUrl } from '@/config/env'
import axios from './http'
/**
 * 系统管理模块
 */
const commonApi = {
  // 登录页面
  login (param) {
    return axios.post(`${baseUrl}/syslogin/login`, param)
  },
  // 根据role获取对应的菜单
  getMenuData (params) {
    return axios.post(`${baseUrl}/sysMenu/getMenuData`, params)
  },
  // 获取所有manu的情况
  getAllMenuData (params) {
    return axios.post(`${baseUrl}/sysMenu/getAllMenuData`, params)
  },
  // 根据userID获取对应的菜单
  getDeptDataByUserID (params) {
    return axios.post(`${baseUrl}/sysDept/getDeptDataByUserID`, params)
  },
  // 获取所有部门的情况
  getAllDeptData (params) {
    return axios.post(`${baseUrl}/sysDept/getAllDeptData`, params)
  }
}
/**
 * 角色的api
 */
const roleApi = {
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/sysRole/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/sysRole/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/sysRole/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/sysRole/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/sysRole/detail`, params)
  }
}

/**
 * 菜单的api
 */
const menuApi = {
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/sysMenu/getMenuLevel`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/sysMenu/deleteByIds`, params)
  },
  // 保存
  save (params) {
    return axios.post(`${baseUrl}/sysMenu/add`, params)
  },
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/sysMenu/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/sysMenu/detail`, params)
  },
  // 获取上级目录树g_catalog
  getMenuTree (params) {
    return axios.post(`${baseUrl}/sysMenu/getMenuTree`, params)
  },
  //根据条件返回
  getByCondition(params){
    return axios.post(`${baseUrl}/sysMenu/getByCondition`, params)
  }
}
/**
 * 菜单的api
 */
const deptApi = {
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/sysDept/getDeptLevel`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/sysDept/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/sysDept/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/sysDept/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/sysDept/detail`, params)
  }
}

/**
 * 字典的api
 */
const dictApi = {
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/sysDict/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/sysDict/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/sysDict/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/sysDict/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/sysDict/detail`, params)
  }
}
/**
 * 参数的api
 */
const configApi = { 
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/sysConfig/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/sysConfig/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/sysConfig/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/sysConfig/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/sysConfig/detail`, params)
  }
}
/**
 * 字典的api
 */
const userApi = {
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/sysUser/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/sysUser/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/sysUser/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/sysUser/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/sysUser/detail`, params)
  },
  // 获取deptTree
  getDeptTreeLazy (params) {
    return axios.post(`${baseUrl}/sysDept/getDeptLevel`, params)
  },
}

export {
  commonApi,
  roleApi,
  menuApi,
  dictApi,
  userApi,
  configApi,
  deptApi
}

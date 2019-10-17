import fetch from '../config/fetch'

const url = 'http://127.0.0.1:8080';
/**
 * 首页面的menudata数据
 */
export const mainmenu = () => fetch('/static/data/menudata.json', {type: 'POST'});

export const catalogmenu = () => fetch('/elling/catalogcontroller.do?getCatalog', {} , 'POST');

/**
 * 获取类型
 */
export const catalogType = () => fetch('/elling/catalogcontroller.do?getCatalogType', {type:'001'} , 'GET');
/**
 * 获取页面列表信息
 */
export const goodlist = pid => fetch('/elling/catalogcontroller.do?getGoodsList', {pid: pid},'GET');

/**
 * 获取详细信息
 */
export const goodsdetail = id => fetch('/elling/catalogcontroller.do?getGoodsDetail', {id: id},'GET');

/**
 * 提交商品详情信息
 */
export const submitItem = (item) => fetch('/elling/catalogcontroller.do?addItem', item,'POST');
/**
 * 根据详情查询商品相亲
 */
export const goodlistbyC = () => fetch('/elling/catalogcontroller.do?getGoodsListByCondition', null,'POST');

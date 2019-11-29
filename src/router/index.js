import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/login/login.vue'], resolve),
    },
    {
      path: '/test',
      component: resolve => require(['../components/page/test/testList.vue'], resolve),
    },
    {
      path: '/home',
      component: resolve => require(['../components/commonnew/Home.vue'], resolve),
      meta: { title: '首界面' },
      children: [ // 二级路由。对应App.vue
        {
          path: '',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/sysRoleList',
          component: resolve => require(['../components/page/sys/role/sysRoleList.vue'], resolve),
          meta: { title: '角色管理' }
        },
        {
          path: '/sysRoleManager',
          component: resolve => require(['../components/page/sys/role/sysRoleManager.vue'], resolve),
          meta: { title: 'sysRoleManager' }
        },
        {
          path: '/sysMenuList',
          component: resolve => require(['../components/page/sys/menu/sysMenuList.vue'], resolve),
          meta: { title: '菜单管理' }
        },
        {
          path: '/sysMenuManager',
          component: resolve => require(['../components/page/sys/menu/sysMenuManager.vue'], resolve),
          meta: { title: 'sysMenuManager' }
        },
        {path: '/sysDictList', component: resolve => require(['../components/page/sys/dict/sysDictList.vue'], resolve), meta: { title: '字典管理' }},
        {path: '/sysDictManager', component: resolve => require(['../components/page/sys/dict/sysDictManager.vue'], resolve), meta: { title: '字典操作' }},
        {path: '/sysUserList', component: resolve => require(['../components/page/sys/user/sysUserList.vue'], resolve), meta: { title: '用户管理' }},
        {path: '/sysUserManager', component: resolve => require(['../components/page/sys/user/sysUserManager.vue'], resolve), meta: { title: '用户操作' }},
        {path: '/sysConfigList', component: resolve => require(['../components/page/sys/config/sysConfigList.vue'], resolve), meta: { title: '参数管理' }},
        {path: '/sysConfigManager', component: resolve => require(['../components/page/sys/config/sysConfigManager.vue'], resolve), meta: { title: '参数操作' }},
        {path: '/sysDeptList', component: resolve => require(['../components/page/sys/dept/sysDeptList.vue'], resolve), meta: { title: '部门管理' }},
        {path: '/sysDeptManager', component: resolve => require(['../components/page/sys/dept/sysDeptManager.vue'], resolve), meta: { title: '部门操作' }},
        {path: '/gGoodsList', component: resolve => require(['../components/page/goods/goods/gGoodsList.vue'], resolve), meta: { title: '商品管理' }},
        {path: '/gGoodsManager', component: resolve => require(['../components/page/goods/goods/gGoodsManager.vue'], resolve), meta: { title: '商品操作' }},
        {path: '/gCatalogList', component: resolve => require(['../components/page/goods/catalog/gCatalogList.vue'], resolve), meta: { title: '目录管理' }},
        {path: '/gCatalogManager', component: resolve => require(['../components/page/goods/catalog/gCatalogManager.vue'], resolve), meta: { title: '目录操作' }},
        //文章管理
        {name:'aArticle',path: '/aArticle', component: resolve => require(['../components/page/contents/article/article.vue'], resolve), meta: { title: '文章编辑' }},
        {path: '/cArticleList', component: resolve => require(['../components/page/contents/article/cArticleList.vue'], resolve), meta: { title: '文章列表' }},
        {path: '/cArticleManager', component: resolve => require(['../components/page/contents/article/cArticleManager.vue'], resolve), meta: { title: '文章管理' }},
        //报表管理
        {path: '/goodsLineChart', component: resolve => require(['../components/page/contents/chart/goodsLineChart.vue'], resolve), meta: { title: '商品线形图' }},

      ]
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve),
    }
  ]
})

//访问之前，都检查下是否登录
// router.beforeEach((to,from,next)=>{
//   console.log("test if login:"+to.path);
//   if(to.path.indexOf('login')>-1){
//     window.sessionStorage.removeItem('access-token');
//   }else{
//     let token = window.sessionStorage.getItem('access-token');
//     console.log("isToken:"+token);
//     if(!token){
//       console.log("her.......");
//       next('/login')
//     }else{
//       next();
//     }
//   }
// })

export default router
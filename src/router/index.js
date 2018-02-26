import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
// const _import = require('./_import_' + process.env.NODE_ENV)

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  meta: { roles: ['admin'], visible: true }, // you can set roles in root nav
  children: [{
    path: 'index',
    // component: _import('permission/index'),
    component: () =>
                import('@/views/permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      visible: true,
      roles: ['admin'] // or you can only set roles in sub nav
    }
  }]
}, {
  path: '/login',
  component: () =>
            import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
            import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () =>
                import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: { title: '主页', icon: 'dashboard', noCache: true, visible: true }
  }]
},

{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: { title: 'Example', icon: 'example', visible: true },
  children: [{
    path: 'table',
    name: 'Table',
    component: () =>
                    import('@/views/table/index'),
    meta: { title: 'Table', icon: 'table', visible: true }
  },
  {
    path: 'tree',
    name: 'Tree',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: 'Tree', icon: 'tree', visible: true }
  }
  ]
},

{
  path: '/form',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Form',
    component: () =>
                import('@/views/form/index'),
    meta: { title: 'Form', icon: 'form', visible: true }
  }]
},
  // 产品管理
{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'ProductManage',
  meta: { title: '产品管理', icon: 'example', visible: true },
  children: [{
    path: 'table',
    name: 'ProductMaintain',
    component: () =>
                    import('@/views/table/index'),
    meta: { title: '产品维护', icon: 'table', visible: true }
  },
  {
    path: 'tree',
    name: 'CurrentControl',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '限流控制', icon: 'tree', visible: true }
  }
  ]
},
  // 客户权限
{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'CustomAuthority',
  meta: { title: '客户权限', icon: 'example', visible: true },
  children: [{
    path: 'table',
    name: 'UserManage',
    component: () =>
                    import('@/views/table/index'),
    meta: { title: '用户管理', icon: 'table', visible: true }
  },
  {
    path: 'tree',
    name: 'RoleManage',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '角色管理', icon: 'tree', visible: true }
  },
  {
    path: 'tree',
    name: 'FusionFailure',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '融合失败', icon: 'tree', visible: true }
  },
  {
    path: 'tree',
    name: 'IdbTotal',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: 'idb统计', icon: 'tree', visible: true }
  },
  {
    path: 'tree',
    name: 'MifgTotal',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: 'mifg统计', icon: 'tree', visible: true }
  }
  ]
},
  // 数据管理
{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'DataManage',
  meta: { title: '数据管理', icon: 'example', visible: true },
  children: [{
    path: 'table',
    name: 'DayProduce',
    component: () =>
                    import('@/views/table/index'),
    meta: { title: '日出品', icon: 'table', visible: true }
  },
  {
    path: 'tree',
    name: 'NormalProduct',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '常规产品', icon: 'tree', visible: true }
  },
  {
    path: 'tree',
    name: 'RoadConstruction',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '施工道路', icon: 'tree', visible: true }
  }
  ]
},
  // 查询统计
{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'QueryTotal',
  meta: { title: '查询统计', icon: 'example', visible: true },
  children: [{
    path: 'table',
    name: 'QDayProduce',
    component: () =>
                    import('@/views/table/index'),
    meta: { title: '日出品', icon: 'table', visible: true }
  },
  {
    path: 'tree',
    name: 'QLimitNum',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '限行限号', icon: 'tree', visible: true }
  }
  ]
},
  // 系统权限
{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'SystemAuthority',
  meta: { title: '系统权限', icon: 'example', visible: true },
  children: [{
    path: 'table',
    name: 'SystemUser',
    component: () =>
                    import('@/views/table/index'),
    meta: { title: '系统用户', icon: 'table', visible: true }
  },
  {
    path: 'tree',
    name: 'RoleAuthor',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '角色权限', icon: 'tree', visible: true }
  },
  {
    path: 'tree',
    name: 'UserProduct',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '用户产品', icon: 'tree', visible: true }
  },
  {
    path: 'trees',
    name: 'ModelConfigure',
    component: () =>
                    import('@/views/tree/index'),
    meta: { title: '模块配置', icon: 'tree', visible: true }
  }
  ]
},

{ path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

export const asyncRouterMap = [{
  path: '/permission',
  component: Layout,
  redirect: '/permission/index',
  meta: { roles: ['admin'] }, // you can set roles in root nav
  children: [{
    path: 'index',
    // component: _import('permission/index'),
    component: () =>
            import('@/views/permission/index'),
    name: 'permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  }]
}]

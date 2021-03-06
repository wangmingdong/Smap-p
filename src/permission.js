import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      store.dispatch('GetInfo').then(res => { // 拉取用户信息
        // console.log(router, store.getters.menuOpts)
        // router.addRoutes([
        //   {
        //     path: '/test',
        //     // name: 'test',
        //     component: () =>
        //                     import('@/views/tree/index'),
        //     meta: { title: 'test', icon: 'control', visible: true, moduleId: 0 }
        //   },

        //   { path: '*', redirect: '/404', hidden: true }
        // ])
        // next()
        // next({ ...to, replace: true })
        // 当页面跳转dashboard时重新跳转到第一个有权限页面
        const constantRouterMap = router.options.routes
        if (to.path === '/dashboard') {
          let flag = false
          for (let i = 0; i < constantRouterMap.length; i++) {
            if (constantRouterMap[i].isMain && constantRouterMap[i].children) {
              if (!flag) {
                for (let j = 0; j < constantRouterMap[i].children.length; j++) {
                  if (constantRouterMap[i].children[j].meta.visible) {
                    flag = true
                    next({
                      path: constantRouterMap[i].path + '/' + constantRouterMap[i].children[j].path
                    })
                    break
                  }
                }
              } else {
                break
              }
            }
          }
        } else {
          next()
        }
      }).catch((data) => {
        console.log(data)
        store.dispatch('FedLogOut').then(() => {
          Message.error('验证失败,请重新登录')
          next({ path: '/login' })
        })
      })
    }
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

import NProgress from 'nprogress' // progress bar




// 全局前置守卫
router.beforeEach((to, from, next) => {

  // console.log(to, 'to');
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else {
    next()
  }

  if (to.path !== from.path) {
    NProgress.start()
  }

})

router.afterEach(() => {
  NProgress.done()
})

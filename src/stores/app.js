// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    drawer: false,
    isLoggedIn: false,
    loginExpireTime: null
  }),
  actions: {
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    setLoginState(isLoggedIn) {
      this.isLoggedIn = isLoggedIn
      if (isLoggedIn) {
        // 设置登录过期时间为24小时后
        this.loginExpireTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
      } else {
        this.loginExpireTime = null
      }
    },
    checkLoginStatus() {
      if (!this.isLoggedIn || !this.loginExpireTime) {
        return false
      }
      // 检查是否过期
      return new Date() < new Date(this.loginExpireTime)
    }
  },
})

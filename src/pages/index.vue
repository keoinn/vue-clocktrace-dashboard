/* eslint-disable no-console */ /* eslint-disable no-undef */
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { verifyPassword } from '@/utils/crypto'
import { useAppStore } from '@/stores/app'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// 预设的管理员密码（实际应用中应该存储在数据库中）
const ADMIN_PASSWORD = 'U2FsdGVkX1/n154TXghm2N7Uw/P7Taap6JHUqOoGuAI='

// 检查是否需要显示过期提示
onMounted(() => {
  if (route.query.expired === 'true') {
    Swal.fire({
      title: '登入已過期',
      text: '您的登入資訊已經過期，請重新登入',
      icon: 'warning',
      confirmButtonText: '確定',
      confirmButtonColor: '#3085d6'
    })
  }
})

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    // 验证用户名
    if (username.value !== 'WH_ADMIN') {
      error.value = '無效的帳號'
      return
    }

    // 验证密码
    const isValidPassword = verifyPassword(password.value, ADMIN_PASSWORD)
    if (!isValidPassword) {
      error.value = '密碼錯誤'
      return
    }

    // 设置登录状态
    appStore.setLoginState(true)

    // 登录成功提示
    await Swal.fire({
      title: '登入成功',
      text: '歡迎使用系統',
      icon: 'success',
      confirmButtonText: '確定',
      confirmButtonColor: '#3085d6'
    })

    // 登录成功
    router.push('/gehc/monthly-report')
  } catch (err) {
    error.value = '登入失敗，請稍後再試'
    console.error('登入錯誤：', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>登入</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <div class="text-center mb-6">
              <v-img
                src="@/assets/workingHours.jpg"
                max-width="200"
                class="mx-auto"
                contain
              />
            </div>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="帳號"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                :error-messages="error"
                required
              />

              <v-text-field
                v-model="password"
                label="密碼"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :error-messages="error"
                required
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="loading"
              @click="handleLogin"
            >
              登入
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.v-container {
  background-color: #f5f5f5;
}

.v-card {
  border-radius: 8px;
}

.v-toolbar {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.v-img {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

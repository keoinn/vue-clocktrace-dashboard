/* eslint-disable no-console */ /* eslint-disable no-undef */
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { verifyPassword,encryptPassword } from '@/utils/crypto'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// 预设的管理员密码（实际应用中应该存储在数据库中）
const ADMIN_PASSWORD = 'U2FsdGVkX1/n154TXghm2N7Uw/P7Taap6JHUqOoGuAI='

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
            <v-toolbar-title>系統登入</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
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
</style>

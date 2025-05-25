import CryptoJS from 'crypto-js'

// 加密密钥
const SECRET_KEY = 'clocktrace-secret-key'

// 加密密码
export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString()
}

// 验证密码
export const verifyPassword = (inputPassword, encryptedPassword) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY)
  const originalPassword = decrypted.toString(CryptoJS.enc.Utf8)
  return inputPassword === originalPassword
} 
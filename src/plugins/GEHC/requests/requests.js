import axios from 'axios'

// const API_BASEURL = import.meta.env.VITE_API_BASEURL
const API_BASEURL = 'http://api.clock-trace.synet-app.com/v1/gehc/reports/'

const requestInstance = axios.create({
  baseURL: API_BASEURL,
  timeout: 300000
})

export default requestInstance

import requestInstance from './requests'

export const getLeaveCalc = (query_date) => {
  return requestInstance.get('test', {
    params: {
      query_date
    }
  })
}

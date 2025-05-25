import requestInstance from './requests'

export const getLeaveCalc = (query_date) => {
  return requestInstance.get('monthly-report', {
    params: {
      query_date
    }
  })
}

import requestInstance from './requests'

export const getLeaveCalc = () => {
  return requestInstance.get('test')
}

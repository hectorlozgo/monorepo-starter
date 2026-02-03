import dayjs from 'dayjs'

export const getTimestamp = () => {
  const now = new Date()
  const date = dayjs(now).format('YYYY-MM-DD')
  const time = dayjs(now).format('HH:mm:ss:SSS')
  return { date, time }
}

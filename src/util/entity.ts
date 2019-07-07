export const longLength = 2000

export const columnOption = {
  json: {
    length: longLength,
    default: '',
  },
}
export const getTimeStampByDate = (date: Date) => {
  return Number((date.getTime() / 1000).toFixed(0))
}

const sliceArray = (count: number, array: any[]): any[][] => {
  if (array.length <= count) { return [array] }
  const segment = Math.ceil(array.length / count)
  return Array.from(Array(segment)).map((_, index) => {
    const min = index * count
    const max = min + count
    return array.slice(min, max)
  })
}

export const chunks = (count: number, array: any[]): any[][] => {
  const arr = []
  for (let i = 0; i < array.length; i += count) {
    arr.push(array.slice(i, i + count))
  }
  return arr;
}

export default sliceArray
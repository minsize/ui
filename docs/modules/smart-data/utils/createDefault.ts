const createDefault = <T>(data: T): T => {
  return Array.isArray(data) ? ([...data] as T) : { ...data }
}

export default createDefault

const getKey = (key?: string | number | (() => string | number)) => {
  return typeof key === "function" ? String(key()) : String(key)
}

export default getKey

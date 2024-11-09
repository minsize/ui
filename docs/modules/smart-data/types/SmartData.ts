export type SmartData<T> = {
  data: T
  system?: {
    isError: boolean
    isLoad: boolean
  }
  update_at: Date
}

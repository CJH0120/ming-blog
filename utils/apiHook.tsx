import useSWR, { BareFetcher, KeyedMutator, SWRConfiguration } from 'swr'
import { fetcher } from './fetcher'
type Result<Data, Error> = {
  data?: Data
  isLoading: boolean
  isError?: Error
  mutate: KeyedMutator<Data>
}
const result = <Data, Error>(mutate: KeyedMutator<Data>, data?: Data, error?: Error): Result<Data, Error> => ({
  data,
  isLoading: !error && !data,
  isError: error,
  mutate,
})

export const qs = (obj: { [key: string]: any }) => {
  const tmp = Object.entries(obj)
    .reduce<string[]>((p, [k, v]) => (v ? [...p, `${k}=${v}`] : p), [])
    .join('&')
  if (tmp) return '?' + tmp
  return ''
}
export const useMember = <Data = API.User, Error = any>(redirect?: string, id?: number, fetcherConfig?: SWRConfiguration<Data, Error, BareFetcher<Data>>) => {
  const { data, error, mutate } = useSWR<Data, Error>(`/api/v1/member${qs({ redirect, id })}`, fetcher, fetcherConfig)
  return result<Data, Error>(mutate, data, error)
}

export const useCategory = <Data = API.Category[], Error = any>(fetcherConfig?: SWRConfiguration<Data, Error, BareFetcher<Data>>) => {
  const { data, error, mutate } = useSWR<Data, Error>(`/api/category`, fetcher, fetcherConfig)
  return result<Data, Error>(mutate, data, error)
}
export const useSelect = <Data = API.Card[], Error = any>(v: string, fetcherConfig?: SWRConfiguration<Data, Error, BareFetcher<Data>>) => {
  const { data, error, mutate } = useSWR<Data, Error>(`/api/post${qs({ v })}`, fetcher, fetcherConfig)
  return result<Data, Error>(mutate, data, error)
}
export const useDetail = <Data = API.Detail[], Error = any>(id: number, fetcherConfig?: SWRConfiguration<Data, Error, BareFetcher<Data>>) => {
  const { data, error, mutate } = useSWR<Data, Error>(`/api/detail${qs({ id })}`, fetcher, fetcherConfig)
  return result<Data, Error>(mutate, data, error)
}
export const usePage = <Data = API.Detail[], Error = any>(fetcherConfig?: SWRConfiguration<Data, Error, BareFetcher<Data>>) => {
  const { data, error, mutate } = useSWR<Data, Error>(`/api/detail/isnum`, fetcher, fetcherConfig)
  return result<Data, Error>(mutate, data, error)
}

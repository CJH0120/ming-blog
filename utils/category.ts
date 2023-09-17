import { fetcher } from './fetcher'

export const addCategory = async (title: string) => {
  return await fetcher(`/api/category`, {
    method: 'POST',
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ title }),
  })
}
export const deleteCategory = async (id: number) => {
  return await fetcher(`/api/category`, {
    method: 'DELETE',
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ id }),
  })
}
export default () => ({ addCategory, deleteCategory })

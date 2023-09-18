import { AddCoupangProps, writeData } from '@/app/(admin)/admin/post/write/page'
import { fetcher } from './fetcher'
import { qs } from './apiHook'

export const addPost = async (writeData: writeData, addData: AddCoupangProps[]) => {
  return fetcher(`/api/post`, {
    method: 'POST',
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ writeData, addData }),
  })
}
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://127.0.0.1:3000'

export const getPost = async (): Promise<{ id: string }[]> => {
  return fetcher(`${apiUrl}/api/post/getpost`, {
    method: 'GET',
    next: { revalidate: 15 },
  })
}

export const getPostDetail = async (id: string): Promise<API.Detail> => {
  return fetcher(`${apiUrl}/api/post/getpost/${id}`, {
    method: 'GET',
    cache: 'no-store',
  })
}
export const getPostMeta = async (id: string): Promise<API.Meta> => {
  return fetcher(`${apiUrl}/api/post/getpost/meta/${id}`, {
    method: 'GET',
    next: { revalidate: 15 },
  })
}

export const deletePost = async (id: number) => {
  return await fetcher(`/api/post`, {
    method: 'DELETE',
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ id }),
  })
}

export const useLogin = async (id: string, pw: string): Promise<any> => {
  return fetcher(`/api/auth`, {
    method: 'POST',
    cache: 'force-cache',
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'Content-Type': 'application/json;charset=utf-8',
    },
    redirect: 'follow',
    body: JSON.stringify({ id, pw }),
  })
}
export default () => ({ addPost, getPost, getPostDetail, getPostMeta, useLogin, deletePost })

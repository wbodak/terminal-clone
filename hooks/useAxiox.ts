import axios, { AxiosResponse } from 'axios'
import { ErrorDto } from '@/types/dtos/ErrorDto'
import { useRouter, Router } from 'expo-router'
import { getDataFromStorage } from '@/utils/asyncStore'
import { useGlobalContext } from './useGlobalContext'
import { CustomAlertProps } from '@/components/SnackeBar/SnackeBar'

let apiHost = ''

const getApiUrl = async () => {
  if (!!apiHost) return apiHost
  await getDataFromStorage('apiUrl').then((apiUrl: string | null) => {
    if (!apiUrl) return null
    apiHost = apiUrl
  })
  return apiHost
}

export const serverApi = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

type ApiPorps = {
  path: string
  headers?: {
    [key: string]: string
  }
  body?: any
  sendToken?: boolean
  noLoading?: boolean
  success?: (data: any) => void
  error?: () => void
  showToastMessage?: boolean
}

const getToken = async () => {
  const token = await getDataFromStorage('userToken')
  const tokenHeader = { Authorization: 'Bearer ' + token }
  return tokenHeader
}

const defaultCatch = (
  err: any,
  router: Router,
  showSnackeBar: ({ dialogName, message }: CustomAlertProps) => void,
  message?: string
) => {
  const myErr = err.response?.data as ErrorDto
  if (myErr) {
    if (myErr.statusCode === 401) {
      router.push('/login')
    }
    showSnackeBar({
      dialogName: 'Dlg_ErrorProcess',
      message: myErr.userMessage || 'Beklenmeyen bir hata oluştu. Daha sonra tekrar deneyiniz.'
    })
    if (myErr.systemMessage) console.log('systemMessage: ', myErr.systemMessage)
  } else {
    showSnackeBar({
      dialogName: 'Dlg_ErrorProcess',
      message: message || 'Beklenmeyen bir hata oluştu. Daha sonra tekrar deneyiniz.'
    })
  }
  return err
}

export const useAxios = () => {
  const router = useRouter()
  const { startLoader, stopLoader, showSnackeBar } = useGlobalContext()

  const axiosGet = async ({
    path,
    headers = {},
    sendToken = true,
    noLoading,
    success,
    error,
    showToastMessage = false
  }: ApiPorps): Promise<void | AxiosResponse<any, any>> => {
    if (!noLoading) startLoader()
    if (sendToken) headers = Object.assign(headers, await getToken())
    return serverApi
      .get(`${await getApiUrl()}${path}`, { headers })
      .then(res => {
        success && success(res.data)
        showToastMessage && showSnackeBar({ dialogName: 'Dlg_Success' })
        return res
      })
      .catch(e => {
        error && error()
        defaultCatch(e, router, showSnackeBar, `${e}`)
      })
      .finally(() => {
        if (!noLoading) stopLoader()
      })
  }

  const axiosPost = async ({
    path,
    body,
    headers = {},
    sendToken = true,
    noLoading,
    success,
    error,
    showToastMessage = true
  }: ApiPorps): Promise<void | AxiosResponse<any, any>> => {
    if (!noLoading) startLoader()
    if (sendToken) headers = Object.assign(headers, await getToken())
    return serverApi
      .post(`${await getApiUrl()}${path}`, body, { headers })
      .then(res => {
        success && success(res.data)
        showToastMessage && showSnackeBar({ dialogName: 'Dlg_Success' })
        return res
      })
      .catch(err => {
        error && error()
        defaultCatch(err, router, showSnackeBar, `${err}`)
      })
      .finally(() => {
        if (!noLoading) stopLoader()
      })
  }

  const axiosPatch = async ({
    path,
    body,
    headers = {},
    sendToken = true,
    noLoading,
    success,
    error,
    showToastMessage = true
  }: ApiPorps): Promise<void | AxiosResponse<any, any>> => {
    if (!noLoading) startLoader()
    if (sendToken) headers = Object.assign(headers, await getToken())
    return serverApi
      .patch(`${await getApiUrl()}${path}`, body, { headers })
      .then(res => {
        success && success(res.data)
        showToastMessage && showSnackeBar({ dialogName: 'Dlg_Success' })
        return res
      })
      .catch(err => {
        error && error()
        defaultCatch(err, router, showSnackeBar)
      })
      .finally(() => {
        if (!noLoading) stopLoader()
      })
  }

  const axiosDelete = async ({
    path,
    headers = {},
    sendToken = true,
    noLoading,
    success,
    error,
    showToastMessage = true
  }: ApiPorps): Promise<void | AxiosResponse<any, any>> => {
    if (!noLoading) startLoader()
    if (sendToken) headers = Object.assign(headers, await getToken())
    return serverApi
      .delete(`${await getApiUrl()}${path}`, { headers })
      .then(res => {
        success && success(res.data)
        showToastMessage && showSnackeBar({ dialogName: 'Dlg_Success' })
        return res
      })
      .catch(err => {
        error && error()
        defaultCatch(err, router, showSnackeBar)
      })
      .finally(() => {
        if (!noLoading) stopLoader()
      })
  }

  return { axiosGet, axiosPost, axiosPatch, axiosDelete }
}

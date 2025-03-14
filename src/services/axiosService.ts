import { useSnackbarStore } from '@/stores/snackbarStore'

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from 'axios'

const axiosSingleton = axios.create({
  baseURL: import.meta.env.BASE_URL, // set to / by default
  withCredentials: true,
})

const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error
}

// extract data
const handleResponse = ({ data }: AxiosResponse) => data

const handleError = (error: any) => {
  const snackbarStore = useSnackbarStore()
  snackbarStore.showSnackbar(
    isAxiosError(error)
      ? error.response
        ? `${error.response.status}: ${error.response.statusText ?? 'Error!'}`
        : `Network Error: ${error.message}`
      : 'Unexpected Error',
  )
}

axiosSingleton.interceptors.response.use(handleResponse, handleError)

abstract class AxiosService {
  protected readonly axios: AxiosInstance = axiosSingleton
  protected abstract readonly rootPath: string
}

export default AxiosService

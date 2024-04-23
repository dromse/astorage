import axios from 'axios'
// oh my gosh, it's was fixed!
axios.defaults.withCredentials = true

export const api_url = 'http://localhost:5000/api'

// $api_json
// $api_multidata
// {
//       withCredentials: true,
//       baseURL: api_url,
//
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
function axiosInstanceGenerator(metaData) {
  const axiosInstance = axios.create(metaData)

  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken',
    )}`
    return config
  })

  axiosInstance.interceptors.response.use(
    (config) => config,

    async (error) => {
      const originalRequest = error.config

      const isNeedRefresh =
        error.response.status === 401 && error.config && !error.config._isRetry

      if (isNeedRefresh) {
        originalRequest._isRetry = true

        try {
          const response = await axios.post(`${api_url}/user/refresh`, {
            withCredentials: true,
          })

          localStorage.setItem(
            'accessToken',
            response.data.userData.accessToken,
          )
          return axiosInstance.request(originalRequest)
        } catch (err) {
          console.log('User is not auth', err)
        }
      }
      throw error
    },
  )

  return axiosInstance
}

export const $api_json = axiosInstanceGenerator({
  withCredentials: true,
  baseURL: api_url,

  headers: {
    'Content-Type': 'application/json',
  },
})

export const $api_multidata = axiosInstanceGenerator({
  withCredentials: true,
  baseURL: api_url,

  headers: {
    'Content-Type': 'multidata/from-data',
  },
})

const $api = axios.create({
  withCredentials: true,
  baseURL: api_url,

  headers: {
    'Content-Type': 'application/json',
  },
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'accessToken',
  )}`
  return config
})

$api.interceptors.response.use(
  (config) => config,

  async (error) => {
    const originalRequest = error.config

    const isNeedRefresh =
      error.response.status === 401 && error.config && !error.config._isRetry

    if (isNeedRefresh) {
      originalRequest._isRetry = true

      try {
        const response = await axios.post(`${api_url}/user/refresh`, {
          withCredentials: true,
        })

        localStorage.setItem('accessToken', response.data.userData.accessToken)
        return $api.request(originalRequest)
      } catch (err) {
        console.log('User is not auth', err)
      }
    }
    throw error
  },
)

export default $api

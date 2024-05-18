import { userStore } from '../stores/user'

export const handleFetch = (url: string, options = {}) => {
  // Get base URL from config
  const config = useRuntimeConfig();

  // Define store variable
  const user = userStore();

  // Set API configuration
  const objectData = {
    headers: {
      authorization: user.userData.accessToken
    },
    ...options
  }

  return $fetch(url, { baseURL: config.public.BASE_API_URL, ...objectData })
}
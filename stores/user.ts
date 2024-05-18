import { defineStore } from 'pinia'

async function apiLogin(email: string, password: string) {
  // Hit API Login
  const responseData = await handleFetch('/endpoint', {
    method: 'post',
    body: {
      email: email,
      password: password
    },
    // headers: {
    //   'header-name': true
    // }
  })
    .then((response: any) => {
      // Set response object
      return Promise.resolve({ access_token: response.data.token, refresh_token: response.data.refresh_token })
    })
    .catch(err => {
      // Error login
      console.log('error login', err.statusCode, '-', err?.data?.message);
      return Promise.reject(new Error('Invalid credentials'))
    });

  // Return data to pinia
  return responseData;
}

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    email: '',
    accessToken: '',
    refreshToken: '',
  }),

  getters: {
    userData(state){
      const emailCookie = useCookie('cookieEmail')
      const accessTokenCookie = useCookie('cookieAccessToken')
      const refreshTokenCookie = useCookie('cookieRefreshToken')

      const userData = {
        email: state.email || emailCookie.value || '',
        accessToken: state.accessToken || accessTokenCookie.value || '',
        refreshToken: state.refreshToken || refreshTokenCookie.value || '',
      }

      return userData;
    }
  },

  actions: {
    logout() {
      // Reset state
      this.$reset();

      // Reset cookie
      const emailCookie = useCookie('cookieEmail')
      const accessTokenCookie = useCookie('cookieAccessToken')
      const refreshTokenCookie = useCookie('cookieRefreshToken')

      emailCookie.value = null;
      accessTokenCookie.value = null;
      refreshTokenCookie.value = null;
    },
  
    async login(email: string, password: string) {
      try {
        // Get login response data
        const loginData = await apiLogin(email, password);

        // Update state
        this.$patch({
          email: email,
          accessToken: loginData.access_token,
          refreshToken: loginData.refresh_token
        })

        // Update cookie
        const emailCookie = useCookie('cookieEmail', { maxAge: 24 * 60 * 60 })
        const accessTokenCookie = useCookie('cookieAccessToken', { maxAge: 24 * 60 * 60 })
        const refreshTokenCookie = useCookie('cookieRefreshToken', { maxAge: 24 * 60 * 60 })
        
        emailCookie.value = email;
        accessTokenCookie.value = loginData.access_token;
        refreshTokenCookie.value = loginData.refresh_token;

        // Redirect to dashboard page
        navigateTo('/panel');
      } catch(err){
        console.log('error pinia', err);
        alert(err);
      }
    },
  },
})
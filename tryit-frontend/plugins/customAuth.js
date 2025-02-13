import { BaseScheme } from '~auth/runtime'

class CustomLoginStrategy extends BaseScheme {
  async login(credentials) {
    try {
      const response = await this.$auth.request('/api/users/login', {
        method: 'POST',
        data: credentials,
      })

      if (response && response.data) {
        this.$auth.setUser(response.data.user)
        this.$auth.setToken(response.data.token)
        return response
      }
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }
}

export default CustomLoginStrategy

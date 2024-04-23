import { $api_json } from '../http'

export default class AuthService {
  static async signup(email, password, username) {
    return $api_json.post('/user/signup', { email, password, username })
  }

  static async login(email, password) {
    return $api_json.post('/user/login', { email, password })
  }

  static async logout() {
    return $api_json.post('/user/logout')
  }

  static async refresh() {
    return $api_json.post('/user/refresh')
  }
}

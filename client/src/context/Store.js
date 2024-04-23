import { makeAutoObservable } from 'mobx'
import AuthService from '../service/AuthService'
import UserService from '../service/UserService'

export default class Store {
  _isAuth = false
  _user = {}
  _isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsAuth(isAuth) {
    this._isAuth = isAuth
  }

  setUser(user) {
    this._user = user
  }

  setLoading(isLoading) {
    this._isLoading = isLoading
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get isLoading() {
    return this._isLoading
  }

  async signup(email, password, username) {
    try {
      const response = await AuthService.signup(email, password, username)

      localStorage.setItem('accessToken', response.data.userData.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.userData.user)
    } catch (err) {
      console.log(err)
    }
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password)

      localStorage.setItem('accessToken', response.data.userData.accessToken)
      this.setIsAuth(true)
      console.log(this)
      this.setUser(response.data.userData.user)
    } catch (err) {
      console.log(err)
    }
  }

  async logout() {
    try {
      await AuthService.logout()

      localStorage.removeItem('accessToken')
      this.setIsAuth(false)
      this.setUser({})
    } catch (err) {
      console.log(err)
    }
  }

  async checkAuth() {
    this.setLoading(true)

    try {
      const response = await AuthService.refresh()

      localStorage.setItem('accessToken', response.data.userData.accessToken)
      this.setIsAuth(true)
      this.setUser(response.data.userData.user)
    } catch (err) {
      console.log(err)
    } finally {
      this.setLoading(false)
    }
  }

  async getAll() {
    try {
      const response = await UserService.getAll()
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }
}

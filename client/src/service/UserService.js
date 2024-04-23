import { $api_json, $api_multidata, api_url } from '../http'

export default class UserService {
  static async getAll() {
    return $api_json.get('/user/getAll')
  }

  static getProfilePhotoLink(id) {
    return `${api_url}/user/getProfilePhoto/${id}`
  }

  static async changeProfilePhoto(profile_photo) {
    const formData = new FormData()

    formData.append('profile_photo', profile_photo)

    return $api_multidata.put('/user/changeProfilePhoto', formData)
  }

  static async changeUsername(username) {
    return $api_json.put('/user/changeUsername', { username })
  }

  static async changePassword(password) {
    return $api_json.put('/user/changePassword', { password })
  }

  static async changeEmail(email) {
    return $api_json.put('/user/changeEmail', { email })
  }

  static async changeVisibility(visibility) {
    return $api_json.put('/user/changeVisibility', { visibility })
  }
}

import axios from 'axios'
import { api_url, $api_json, $api_multidata } from '../http'

const ACCESS_TOKEN = localStorage.getItem('accessToken')

export default class AudioService {
  static async upload(audio, title, visibility) {
    const formData = new FormData()

    formData.append('audio', audio)
    formData.append('visibility', visibility)
    formData.append('title', title)

    return $api_multidata.post('/audio/upload', formData)
  }

  static async download(url, title) {
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      const fileName = `${title}.${
        res.data.type === 'audio/mpeg' ? 'mp3' : 'wav'
      }`
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
    })
  }

  static getAll() {
    return $api_json.get('/audio/getUserAudios')
  }

  static generateAudioLink(audioId) {
    const audio_link = `${api_url}/audio/download/${ACCESS_TOKEN}/${audioId}`
    return audio_link
  }

  static remove(audioId) {
    $api_json.delete(`/audio/delete/${audioId}`).then().catch()
  }
}

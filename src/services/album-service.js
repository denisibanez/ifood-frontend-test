import axios from 'axios'

export default class AlbumService {
  getAlbums(param) {
    const request = axios.get(`${process.env.VUE_APP_BASE_PATH}/us/rss/topalbums/limit=${param}`)
      .then(response => response)
      .catch(e => {
        throw e
      }).finally(() => {

      })
    return request
  }
}
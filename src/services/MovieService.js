export default class MovieService {
  apiKey = 'ac2447c3cc72362b6bedab90b6c30a44'

  apiBase = 'https://api.themoviedb.org/3'

  async getRequest(url) {
    const res = await fetch(`${this.apiBase}${url}api_key=${this.apiKey}`)
    if (!res.ok) {
      throw new Error(`${url} Could not fetch, recieved ${res.status}`)
    }

    const body = await res.json()

    return body
  }

  async getTopRated(page = 1) {
    const res = await this.getRequest(`/movie/top_rated?page=${page}&`)
    return res
  }

  async getSearched(query, page = 1) {
    const res = await this.getRequest(`/search/movie?query=${query}&page=${page}&`)
    return res
  }

  async getMovieGenres() {
    const res = await this.getRequest('/genre/movie/list?')
    return res
  }
}

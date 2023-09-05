import React, { Component } from 'react'
import { debounce } from 'lodash'

import MovieService from './services/MovieService'
import ConnectionBoundary from './components/ConnectionBoundary'
import SectionChoice from './components/SectionChoice'
import GenresContext from './components/GenresContext/GenresContext'

export default class App extends Component {
  movieService = new MovieService()

  // eslint-disable-next-line react/state-in-constructor
  state = {
    data: [],
    loading: true,
    error: false,
    totalPages: 0,
    page: 1,
    isInSearch: false,
    searchQuery: '',
    genres: [],
    ratedMovies: [],

    // screenWidth: window.innerWidth,
  }

  // debouncedTrackScreenWidth = debounce(this.trackScreenWidth, 300)

  componentDidMount() {
    this.getGenres()
    this.getMovies()
    this.getRatedMovies()
    // window.addEventListener('resize', this.debouncedTrackScreenWidth)
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.debouncedTrackScreenWidth)
  // }

  onSearchQueryChange = debounce((e) => {
    const query = e.target.value.trim()
    if (query) {
      this.setState({ isInSearch: true, searchQuery: query, page: 1, loading: true })
      this.getSearchedMovies(e.target.value)
    } else {
      this.setState({ isInSearch: false, searchQuery: '', page: 1, loading: true })
      this.getMovies()
    }
  }, 400)

  getMovies(page) {
    this.movieService
      .getTopRated(page)
      .then((body) => this.setState({ data: body.results, loading: false, totalPages: 500 }))
      .catch(this.onError)
  }

  getGenres() {
    this.movieService.getMovieGenres().then((body) => this.setState({ genres: body }))
  }

  getSearchedMovies(query, page) {
    this.movieService
      .getSearched(query, page)
      .then((body) => this.setState({ data: body.results, loading: false, totalPages: body.total_pages }))
      .catch(this.onError)
  }

  getRatedMovies = () => {
    const { ratedMovies } = this.state
    const newRatedList = Object.values(localStorage).map((obj) => JSON.parse(obj))

    if (JSON.stringify(newRatedList) === JSON.stringify(ratedMovies)) {
      return
    }
    this.setState({ ratedMovies: newRatedList })
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  onPageChange = (pageNum) => {
    const { isInSearch, searchQuery } = this.state

    this.setState({ page: pageNum, loading: true })
    if (isInSearch) {
      this.getSearchedMovies(searchQuery, pageNum)
    } else {
      this.getMovies(pageNum)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onRatingChange = (movie, value) => {
    const { id } = movie
    const ratedMovie = { ...movie, personalRating: value }

    localStorage.setItem(id, JSON.stringify(ratedMovie))
  }

  render() {
    const { data, loading, error, totalPages, page, ratedMovies, genres } = this.state

    return (
      <div className="App">
        <ConnectionBoundary>
          <GenresContext.Provider value={genres}>
            <SectionChoice
              data={data}
              loading={loading}
              error={error}
              totalPages={totalPages}
              page={page}
              onPageChange={this.onPageChange}
              onSearchQueryChange={this.onSearchQueryChange}
              onRatingChange={this.onRatingChange}
              getRatedMovies={this.getRatedMovies}
              ratedMovies={ratedMovies}
            />
          </GenresContext.Provider>
        </ConnectionBoundary>
      </div>
    )
  }
}

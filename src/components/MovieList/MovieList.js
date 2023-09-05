import { Result, Row } from 'antd'
import { PropTypes } from 'prop-types'

import MovieCard from '../MovieCard'

function MovieList({ data, onRatingChange, label }) {
  const movies = data.map((movie) => {
    const { id, personalRating } = movie

    return <MovieCard key={id} movie={movie} personalRating={personalRating} onRatingChange={onRatingChange} />
  })

  const resultTitle =
    // eslint-disable-next-line quotes
    label === 'rated' ? "At the moment, you haven't rated a single movie" : 'There is no films with such name.'

  const FinalList = data.length ? (
    <Row style={{ marginTop: 12 }}>{movies}</Row>
  ) : (
    <Result status="warning" title={resultTitle} style={{ marginTop: '13%' }} />
  )

  return FinalList
}

export default MovieList

MovieList.defaultProps = {
  onRatingChange: () => {},
}

MovieList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRatingChange: PropTypes.func,
}

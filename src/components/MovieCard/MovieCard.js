import { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { Space, Image, Typography, Col, Rate } from 'antd'
import Title from 'antd/es/typography/Title'

import './MovieCard.css'

import GenresContext from '../GenresContext/GenresContext'

const { Text } = Typography

function MovieCard({ movie, personalRating = 0, onRatingChange }) {
  const {
    title,
    overview,
    release_date: releaseDate,
    poster_path: posterPath,
    vote_average: voteAverage,
    genre_ids: genreIds,
  } = movie

  const { genres } = useContext(GenresContext)

  const descriptionSize = 150

  function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
      return text
    }
    const words = text.split(' ')
    let shortened = ''
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if (shortened.length + word.length + 1 <= maxLength) {
        shortened += `${word} `
      } else {
        shortened = `${shortened.trim()}...`
        break
      }
    }
    return shortened
  }

  function formatDate(dateString) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const dateParts = dateString.split('-')
    const month = months[parseInt(dateParts[1], 10) - 1]
    const day = parseInt(dateParts[2], 10)
    const year = parseInt(dateParts[0], 10)

    return `${month} ${day}, ${year}`
  }

  const movieGenres = genreIds
    .map((id) => {
      const foundGenres = genres.find((genre) => genre.id === id)
      return foundGenres
    })
    .map((genre) => {
      const { id, name } = genre
      return (
        <Text keyboard key={id}>
          {name}
        </Text>
      )
    })

  const date = formatDate(releaseDate)
  const trimmedOverview = shortenText(overview, descriptionSize)
  let ratingColor

  if (voteAverage <= 3) {
    ratingColor = 'card__rating--red'
  } else if (voteAverage <= 5) {
    ratingColor = 'card__rating--orange'
  } else if (voteAverage <= 7) {
    ratingColor = 'card__rating--yellow'
  } else {
    ratingColor = 'card__rating--green'
  }
  return (
    <Col lg={24} xl={12}>
      <div className="card">
        <div className="card__image">
          <Image
            alt="example"
            src={`http://image.tmdb.org/t/p/w500${posterPath}`}
            fallback="https://dummyimage.com/180x280/a8a8a8/000"
          />
        </div>
        <div className="card__content">
          <div className="card__header">
            <Title level={5} className="card__title">
              {title}
            </Title>
            <div className={`card__rating ${ratingColor}`}>
              <span className="rate">{voteAverage.toFixed(1)}</span>
            </div>
            <Text className="card__date">{date}</Text>
            <Space className="card__genres" wrap size={6}>
              {movieGenres.length ? movieGenres : <Text keyboard>No genres</Text>}
            </Space>
          </div>
          <Text className="card__description">{trimmedOverview}</Text>
          <Rate
            count={10}
            defaultValue={personalRating}
            allowHalf
            className="card__rate"
            onChange={(value) => onRatingChange(movie, value)}
          />
        </div>
      </div>
    </Col>
  )
}

export default MovieCard

MovieCard.defaultProps = {
  onRatingChange: () => {},
  personalRating: 0,
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  personalRating: PropTypes.number,
  onRatingChange: PropTypes.func,
}

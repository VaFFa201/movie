import { Tabs } from 'antd'
import { PropTypes } from 'prop-types'

import ViewingSection from '../ViewingSection'
import MovieList from '../MovieList'

function SectionChoice({
  data,
  loading,
  error,
  onPageChange,
  onSearchQueryChange,
  onRatingChange,
  page,
  totalPages,
  getRatedMovies,
  ratedMovies,
}) {
  const sections = [
    {
      label: 'Search',
      key: 1,
      children: (
        <ViewingSection
          data={data}
          error={error}
          loading={loading}
          totalPages={totalPages}
          page={page}
          onPageChange={onPageChange}
          onSearchQueryChange={onSearchQueryChange}
          onRatingChange={onRatingChange}
          label="search"
        />
      ),
    },
    {
      label: 'Rated',
      key: 2,
      children: <MovieList data={ratedMovies} onRatingChange={onRatingChange} label="rated" />,
    },
  ]

  return <Tabs defaultActiveKey="1" centered size="large" items={sections} onChange={getRatedMovies} />
}

export default SectionChoice

SectionChoice.defaultProps = {
  onPageChange: () => {},
  onSearchQueryChange: () => {},
  onRatingChange: () => {},
  getRatedMovies: () => {},
  totalPages: 0,
  page: 1,
}

SectionChoice.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func,
  onSearchQueryChange: PropTypes.func,
  onRatingChange: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  getRatedMovies: PropTypes.func,
  ratedMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
}

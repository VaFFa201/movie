import React from 'react'
import { Layout, Pagination } from 'antd'
import { PropTypes } from 'prop-types'

import Search from '../Search'
import MovieList from '../MovieList'
import Spinner from '../Spinner'
import ErrorIndicator from '../ErrorIndicator'

function ViewingSection({
  data,
  loading,
  error,
  onPageChange,
  onSearchQueryChange,
  onRatingChange,
  page,
  totalPages,
  label,
}) {
  const hasData = !(loading || error)

  const errorAlert = error ? <ErrorIndicator /> : null
  const spinner = loading ? <Spinner /> : null
  const movieList = hasData ? (
    <>
      <MovieList data={data} onRatingChange={onRatingChange} label={label} />
      <Pagination
        defaultCurrent={1}
        current={page}
        pageSize={data.length}
        total={data.length * totalPages}
        style={{ margin: '0 auto', marginTop: '15px', paddingBottom: '25px' }}
        showSizeChanger={false}
        onChange={onPageChange}
      />
    </>
  ) : null

  return (
    <Layout>
      <Search size="large" style={{ padding: '0 25px' }} onSearchQueryChange={onSearchQueryChange} />
      {errorAlert}
      {spinner}
      {movieList}
    </Layout>
  )
}

export default ViewingSection

ViewingSection.defaultProps = {
  onPageChange: () => {},
  onSearchQueryChange: () => {},
  onRatingChange: () => {},
  totalPages: 0,
  page: 1,
}

ViewingSection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func,
  onSearchQueryChange: PropTypes.func,
  onRatingChange: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
}

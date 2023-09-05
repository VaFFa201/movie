import { Input } from 'antd'
import React from 'react'
import { PropTypes } from 'prop-types'

function Search({ onSearchQueryChange }) {
  return <Input placeholder="Type to search..." onChange={onSearchQueryChange} />
}

export default Search

Search.defaultProps = {
  onSearchQueryChange: () => {},
}

Search.propTypes = {
  onSearchQueryChange: PropTypes.func,
}

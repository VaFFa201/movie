import { Spin } from 'antd'
import React from 'react'

function Spinner() {
  return (
    <Spin tip="Loading..." size="large" style={{ display: 'block', marginTop: '25%' }}>
      <div className="content" />
    </Spin>
  )
}

export default Spinner

import { Result, Space, Typography } from 'antd'
import React from 'react'

const { Text } = Typography

function ErrorIndicator({ description }) {
  return (
    <Result
      status="warning"
      title="Resource access error"
      description={description}
      showIcon
      style={{ marginTop: '18%' }}
      extra={[
        <Space direction="vertical" key={1}>
          <Text strong style={{ fontSize: 18 }}>
            At the moment, there is a chance that the server is playing hard to get and does not want us to get data
            from it.
          </Text>
          <Text>
            Check your internet connection and reload the page. If that didn&apos;t help, then try to access the
            resource later.
          </Text>
        </Space>,
      ]}
    />
  )
}

export default ErrorIndicator

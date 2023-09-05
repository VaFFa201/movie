import { Layout, Result } from 'antd'
import useNavigatorOnline from 'use-navigator-online'
import './ConnectionBoundary.css'

function ConnectionBoundary({ children }) {
  const { isOnline } = useNavigatorOnline()

  if (isOnline) {
    return <Layout className="main-layout">{children}</Layout>
  }
  return <Result status="warning" title="There are some problems with your internet connection." />
}

export default ConnectionBoundary

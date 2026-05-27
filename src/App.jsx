import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import About from './pages/About'
import ColumnsPage from './pages/ColumnsPage'
import ColumnPage from './pages/ColumnPage'

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>页面不存在</p>
      <Link to="/" className="btn">返回首页</Link>
    </div>
  )
}

// BASE_URL is '/' in dev, '/blog/' in production build — strip trailing slash for basename
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'post/:id', element: <PostDetail /> },
      { path: 'columns', element: <ColumnsPage /> },
      { path: 'column/:columnId', element: <ColumnPage /> },
      { path: 'about', element: <About /> },
    ],
  },
], { basename })

export default function App() {
  return <RouterProvider router={router} />
}

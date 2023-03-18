// Write your JS code here
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import HomeCarousel from '../HomeCarousel'
import Category from '../Category'
import About from '../About'

const Home = () => {
  const getToken = Cookies.get('jwt_token')
  if (getToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="main-section">
      <Header />
      <HomeCarousel />
      <Category />
      <About />
    </div>
  )
}

export default Home

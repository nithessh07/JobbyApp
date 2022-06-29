import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-container">
      <Header />
      <div className="home-bottom-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-title">
          Millions of people are searching for jobs, salary information ,
          company reviews. Find the Job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="home-btn-container">
          <button className="home-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home

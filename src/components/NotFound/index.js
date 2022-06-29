import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <Header />
    <div className="not-found-card-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-para">
        We`re sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound

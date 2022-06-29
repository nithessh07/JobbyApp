import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyImg,
    type,
    description,
    rating,
    location,
    title,
    id,
  } = jobDetails

  return (
    <li className="similar-list-item" key={id}>
      <Link to={`/jobs/${id}`} className="similar-Link-item">
        <div className="similar-logo-container">
          <img
            className="similar-card-logo"
            src={companyImg}
            alt="similar job company logo"
          />
          <div>
            <h1 className="similar-title">{title}</h1>
            <div className="similar-rating-container">
              <AiFillStar className="card-rating-icon" />
              <p className="similar-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="descriptions-container">
          <h1 className="similar-head">Description</h1>
          <p className="similar-para">{description}</p>
        </div>
        <div className="similar-location-container">
          <MdLocationOn className="location-icon" />
          <p className="location-para">{location}</p>
          <BsBriefcaseFill className="location-icon" />
          <p className="location-para">{type}</p>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobItem

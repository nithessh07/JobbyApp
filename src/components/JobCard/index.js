import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    logoUrl,
    type,
    description,
    rating,
    location,
    title,
    id,
    packages,
  } = jobData

  return (
    <li className="card-container">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="card-logo-container">
          <img className="card-logo" src={logoUrl} alt="company logo" />
          <div>
            <h1 className="card-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="card-rating-icon" />
              <p className="card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location-para">{location}</p>
            <BsBriefcaseFill className="location-icon" />
            <p className="location-para">{type}</p>
          </div>
          <div>
            <h1 className="card-package">{packages}</h1>
          </div>
        </div>
        <div>
          <h1 className="card-description-title">Description</h1>
          <p className="card-description">{description}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard

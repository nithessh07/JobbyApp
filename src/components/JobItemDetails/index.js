import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {jobDetails: [], similarJobsData: [], apiStatus: ''}

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedData = data => ({
    companyLogo: data.job_details.company_logo_url,
    companyWebsite: data.job_details.company_website_url,
    type: data.job_details.employment_type,
    id: data.job_details.id,
    description: data.job_details.job_description,
    lifeAtCompony: data.job_details.life_at_company,
    rating: data.job_details.rating,
    title: data.job_details.title,
    annumPackage: data.job_details.package_per_annum,
    skills: data.job_details.skills,
    location: data.job_details.location,
  })

  getSimilarFormattedData = data => ({
    companyImg: data.company_logo_url,
    type: data.employment_type,
    id: data.id,
    description: data.job_description,
    rating: data.rating,
    location: data.location,
    title: data.title,
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedJobData = this.getFormattedData(fetchedData)
      const similarJobData = fetchedData.similar_jobs.map(eachSimilarJob =>
        this.getSimilarFormattedData(eachSimilarJob),
      )
      this.setState({
        jobDetails: updatedJobData,
        similarJobsData: similarJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderJobItemView = () => {
    const {jobDetails} = this.state
    const {
      companyLogo,
      companyWebsite,
      type,
      description,
      lifeAtCompony,
      rating,
      title,
      annumPackage,
      skills,
      location,
    } = jobDetails
    return (
      <>
        <div className="item-card-container">
          <div className="card-logo-container">
            <img
              className="item-card-logo"
              src={companyLogo}
              alt="job details company logo"
            />
            <div>
              <h1 className="item-card-title-head">{title}</h1>
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
              <h1 className="card-package">{annumPackage}</h1>
            </div>
          </div>
          <div>
            <div className="description-container">
              <h1 className="item-card-head1">Description</h1>
              <a href={companyWebsite} className="website-link">
                visit
                <FaExternalLinkAlt className="website-link-icon" />
              </a>
            </div>
            <p className="item-card-para">{description}</p>
          </div>
          <div>
            <h1 className="item-card-head2">Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <li className="skill-container">
                  <img
                    className="skill-icon"
                    src={each.image_url}
                    alt={each.name}
                  />
                  <p className="skill-label">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="item-card-head2">Life At Company</h1>
            <div className="life-at-company-container">
              <p className="item-card-para1">{lifeAtCompony.description}</p>
              <img
                className="life-at-company-img"
                src={lifeAtCompony.image_url}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        {this.renderSimilarJob()}
      </>
    )
  }

  renderJobFailureView = () => (
    <div className="similar-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="job-failure-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader" className="item-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSimilarJob = () => {
    const {similarJobsData} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="job-item-container">
        <Header />
        <div className="item-bottom-container">
          {this.renderJobItemDetails()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails

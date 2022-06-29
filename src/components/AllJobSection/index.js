import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'
import FilterSection from '../FilterSection'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobSection extends Component {
  state = {
    jobsList: [],
    apiStatus: '',
    activeType: [],
    activeRange: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {activeType, activeRange, searchInput} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeType}&minimum_package=${activeRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        logoUrl: job.company_logo_url,
        type: job.employment_type,
        description: job.job_description,
        id: job.id,
        rating: job.rating,
        location: job.location,
        title: job.title,
        packages: job.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeType = check => {
    const {activeType} = this.state

    if (activeType.includes(check) === false) {
      activeType.push(check)
      this.setState({...activeType}, this.getJobs)
    } else {
      const active = activeType.filter(each => each !== check)
      this.setState({activeType: active}, this.getJobs)
    }
  }

  onChangeRange = range => {
    const {activeRange} = this.state

    if (activeRange.includes(range) === false) {
      activeRange.push(range)
      this.setState({...activeRange}, this.getJobs)
    } else {
      const active = activeRange.filter(each => each !== range)
      this.setState({activeRange: active}, this.getJobs)
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = () => {
    this.getJobs()
  }

  onChangeSearchIcon = () => {
    this.getJobs()
  }

  onClickRetry = () => {
    this.getJobs()
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-jobs-list-container">
        <ul className="list-container">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="jobs-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="job-failure-heading-text">No Jobs Found</h1>
        <p className="jobs-failure-description">
          We could not find any Jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
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
    <div className="jobs-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSearchBar = () => (
    <div className="search-container">
      <input
        type="search"
        onChange={this.onChangeSearchInput}
        onKeyDown={this.onEnterSearchInput}
        placeholder="Search"
        className="search-input"
      />
      <button
        type="button"
        testid="searchButton"
        className="search-icon-container"
        onClick={this.onClickSearchIcon}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  render() {
    const {activeType, activeRange} = this.state
    return (
      <div className="allJobs-container">
        <div className="left-section">
          <FilterSection
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            activeTypeId={activeType}
            onChangeType={this.onChangeType}
            activeRange={activeRange}
            onChangeRange={this.onChangeRange}
          />
        </div>
        <div className="jobs-right-section">
          {this.renderSearchBar()}
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}

export default AllJobSection

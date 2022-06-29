import ProfileSection from '../ProfileSection'

import './index.css'

const FilterSection = props => {
  const renderEmploymentType = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(type => {
      const {onChangeType} = props
      const onChangeTypeItem = () => {
        onChangeType(type.employmentTypeId)
      }
      return (
        <li className="type-list-item">
          <input
            onChange={onChangeTypeItem}
            type="checkbox"
            id={type.employmentTypeId}
          />
          <label className="type-list-para" htmlFor={type.employmentTypeId}>
            {type.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {onChangeRange} = props
      const onChangeRangeItem = () => {
        onChangeRange(range.salaryRangeId)
      }
      return (
        <li className="type-list-item">
          <input
            onChange={onChangeRangeItem}
            type="checkbox"
            id={range.salaryRangeId}
          />
          <label className="type-list-para" htmlFor={range.salaryRangeId}>
            {range.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filter-container">
      <ProfileSection />
      <div className="type-container">
        <h1 className="type-head">Type of Employment</h1>
        <ul className="type-list">{renderEmploymentType()}</ul>
      </div>
      <div className="type-container">
        <h1 className="type-head">Salary Range</h1>
        <ul className="type-list">{renderSalaryRange()}</ul>
      </div>
    </div>
  )
}

export default FilterSection

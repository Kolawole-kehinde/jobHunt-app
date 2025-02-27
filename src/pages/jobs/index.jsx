import React from 'react'
import JobListings from '../../Components/jobs/JobListing'
import TopBanner from '../../Components/TopBanner'

const AllJobsPage = () => {
  return (
    <>
    <TopBanner/>
      <JobListings title="All Jobs" ShowAllJobsBtn={false}/>
    </>
  )
}

export default AllJobsPage

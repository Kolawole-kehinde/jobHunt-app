import React from 'react'
import ShowCase from '../Components/ShowCase'
import TopBanner from '../Components/TopBanner'
import JobListing from '../Components/jobs/JobListing'
import AllJobs from '../Components/jobs/AllJobs'

const HomePage = () => {
  return (
    <div>
      <ShowCase/>
      <TopBanner/>
      <JobListing/>
    </div>
  )
}

export default HomePage

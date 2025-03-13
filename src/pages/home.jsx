import React from 'react'
import ShowCase from '../Components/ShowCase'
import TopBanner from '../Components/TopBanner'
import JobListing from '../Components/jobs/JobListing'
import ButtomBanner from '../Components/ButtomBanner'






const HomePage = () => {
  return (
    <div>
      <ShowCase/>
      <TopBanner/>
      <JobListing/>
      <ButtomBanner/>
 
    </div>
  )
}

export default HomePage

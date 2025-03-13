import React from 'react'
import ShowCase from '../Components/ShowCase'
import TopBanner from '../Components/TopBanner'
import JobListing from '../Components/jobs/JobListing'
import ButtomBanner from '../Components/ButtomBanner'
import Dashboard from './dashboard'





const HomePage = () => {
  return (
    <div>
      <ShowCase/>
      <TopBanner/>
      <JobListing/>
      <ButtomBanner/>
   <Dashboard/>
    </div>
  )
}

export default HomePage

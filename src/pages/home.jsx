import React from 'react'
import ShowCase from '../Components/ShowCase'
import TopBanner from '../Components/TopBanner'
import JobListing from '../Components/features/jobs/JobListing'
import ButtomBanner from '../Components/ButtomBanner'
import useJobs from '../Components/features/hooks/useJobs'






const HomePage = () => {
  const query = useJobs();
  return (
    <div>
      <ShowCase/>
      <TopBanner/>
      <JobListing status={query?.status} job={query?.data} error={query?.error}/>
      <ButtomBanner/>
 
    </div>
  )
}

export default HomePage

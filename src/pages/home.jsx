import React from 'react'
import ShowCase from '../Components/ShowCase'
import TopBanner from '../Components/TopBanner'
import JobListing from '../Components/features/jobs/JobListing'
import useJobs from '../Components/features/hooks/useJobs'






const HomePage = () => {
  const query = useJobs();
  return (
    <div>
      <ShowCase/>
      <TopBanner/>
      <JobListing status={query?.status} jobs={query?.data} error={query?.error} limit={6}/>
      
 
    </div>
  )
}

export default HomePage

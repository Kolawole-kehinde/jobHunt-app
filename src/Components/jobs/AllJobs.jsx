import React from 'react'
import JobTitle from './JobTitle'
import { jobListings } from '../../constant/job'
import Job from './Job'
import TopBanner from '../TopBanner'

const AllJobs = () => {
  return (
    <section>
         <TopBanner />
    <div className="container mx-auto p-4 mt-4">
       
      <JobTitle>All Jobs</JobTitle>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-6">
        {jobListings?.map((job) => (
          <Job key={job.id} {...job} />
        ))}
      </div>

    </div>
  </section>
  )
}

export default AllJobs

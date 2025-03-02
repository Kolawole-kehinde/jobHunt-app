import React from 'react'
import JobListings from '../../Components/jobs/JobListing'
import TopBanner from '../../Components/TopBanner'
import ShowcaseSearch from '../../Components/layout/ShowcaseSearch'

const AllJobsPage = () => {
  return (
    <>
    <TopBanner/>
    <section className='bg-blue-900 py-6'>
        <ShowcaseSearch />
    </section>
      <JobListings title="All Jobs" ShowAllJobsBtn={false}/>
    </>
  )
}

export default AllJobsPage

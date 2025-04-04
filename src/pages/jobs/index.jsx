

import TopBanner from '../../Components/TopBanner'
import ShowcaseSearch from '../../Components/ShowcaseSearch'
import JobListings from '../../Components/features/jobs/JobListing'

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

import TopBanner from "../../Components/TopBanner";
import ShowcaseSearch from "../../Components/ShowcaseSearch";
import JobListings from "../../Components/features/jobs/JobListing";
import useJobs from "../../Components/features/hooks/useJobs";

const AllJobsPage = () => {
  const query = useJobs();
  return (
    <>
      <TopBanner />
      <section className="bg-blue-900 py-6">
        <ShowcaseSearch />
      </section>
      <JobListings
        title="All Jobs"
        ShowAllJobsBtn={false}
        status={query?.status}
        jobs={query?.data}
        error={query?.error}
        limit={null} // ✅ Show all jobs
      />
    </>
  );
};

export default AllJobsPage;

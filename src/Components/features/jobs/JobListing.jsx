import JobTitle from "./JobTitle";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Job from "./Job";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../../libs/supabase";



const JobListings = ({ title = "Recent Jobs", ShowAllJobsBtn = true }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      setLoading(true);
      setErrorMsg(""); 
      setErrorMsg("Failed to load job listings. Please try again later.");
      try {
        const { data, error } = await supabase.from("jobs").select("*");
        if (error) {
          throw error;
        }
        setData(data);
      } catch (error) {
        console.log('error', error);
      } finally{
        setLoading(false);
      }
    };
    getJobs();
  }, []);

  console.log(data, loading);

  return (
    <section>
      <div className="container mx-auto p-4 mt-4">
        <JobTitle>{title}</JobTitle>

        {loading && (
            <div className=" h-[400px] flex justify-center items-center">
              <p className="text-3xl lg:text-4xl font-bold text-blue-500">Loading...</p>

            </div>
        )}

        {data?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-6">
            {data?.map((job) => (
              <Job key={job.id} {...job} />
            ))}
          </div>
        )}
        {ShowAllJobsBtn && data?.length > 0 && (
          <div className="flex justify-center items-center">
            <Link
              to="/jobs"
              className="flex items-center gap-1 text-xl text-center"
            >
              <FaArrowAltCircleRight />
              Show All Jobs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;

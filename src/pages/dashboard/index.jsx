import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import ProfileInfo from '../../Components/features/dashboard/ProfileInfo';
import JobTitle from '../../Components/features/jobs/JobTitle';

function Dashboard() {
  const { user } = useAuth();
  return (
    <div className='bg-slate-100 w-full h-screen grid lg:grid-cols-2 gap-6 p-10'>
       <ProfileInfo/>
       <section>
          <JobTitle>Job Listing</JobTitle>
       </section>
    </div>
  )
}

export default Dashboard;

import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import ProfileInfo from '../../Components/features/dashboard/ProfileInfo';
import UserJobs from '../../Components/features/dashboard/UserJobs';



function Dashboard() {
  const { user } = useAuth();
  return (
    <div className='bg-slate-100 w-full h-auto grid lg:grid-cols-2 gap-6 p-10'>
       <ProfileInfo/>
       <UserJobs/>
    </div>
  )
}

export default Dashboard;

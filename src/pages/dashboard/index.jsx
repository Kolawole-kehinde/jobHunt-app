import React from 'react'
import { useAuth } from '../../hooks/useAuth';

function Dashboard() {
  const { user } = useAuth();
  return (
    <div className='w-full bg-slate-100 h-screen container mx-auto grid lg:grid-cols-2gap-6'>
       <section className='bg-white shadow-lg rounded-lg p-4'>
          <h2 className='text-blue-900 text-2xl font-semibold'>Profile Info</h2>
       </section>
       <section></section>
    </div>
  )
}

export default Dashboard;

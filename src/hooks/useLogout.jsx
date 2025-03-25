// import React, { useState } from 'react'
// import { supabase } from '../libs/supabase'
// import toast from 'react-hot-toast';

// const UseLogout = () => {
//     const [loading, setLoading] = useState(false);
//     const handleLogout = async () => {
//         setLoading(true);
//         try {
//             let { error } = await supabase.auth.signOut();
//             if(error) throw error;
//             localStorage.clear();
//         } catch (error) {
//             toast.error(error.message);
//         }finally{
//             setLoading(false);
//         }
//     };
//   return {
//     loading,
//     handleLogout,
//   }
    
// }

// export default UseLogout;
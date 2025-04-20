import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { supabase } from '../../libs/supabase'
import toast from 'react-hot-toast'

const ForgotPasswordShema = z.object({
    email: z.string().email({message: "Kindly enter a valid email"}).trim()
})

const ForgotPasswordPage = () => {
      const [loading, setLoading] = useState(false)

      const {
        register,
        handleSubmit,
        formState: {errors}
      } =useForm({
        resolver: zodResolver(ForgotPasswordShema)
      });

      const onSubmit = async ({ email }) => {
        setLoading(true);
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
          });
      
          if (error) {
            toast.error("Failed to send reset link. Please try again.");
          } else {
            toast.success("Password reset link sent to your email.");
          }
        } catch (err) {
          toast.error("Something went wrong.");
        } finally {
          setLoading(false);
        }
      };
      
  return (
    <form 
     onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <h2 className="text-xl font-semibold">Forgot Password</h2>
      <p className="text-gray-600">Enter your registered email address</p>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
       {...register('email')}
      />
      

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        disabled={loading}
       
      >
       {loading ? "Loading..." : "Send Reset Link"}
       
      </button>
    </form>
  )
}

export default ForgotPasswordPage
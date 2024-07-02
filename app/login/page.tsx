import React from 'react'
import Image from 'next/image';
import logo from '../../public/assets/logo.png';

const Login
 = () => {
  return (
    <main style={{ height: '100vh' }}
    className='h-full bg-pageBg bg-cover bg-center bg- bg-no-repeat flex items-center flex-col'>

      <div className='flex justify-start items-center pl-10 pb-10 mt-5'>
        <Image src={logo} alt='logo' className='w-1/12'/>
      </div>

      <div className='w-11/12 h-4/5 flex justify-center items-center bg-white rounded-2xl flex-col'>
        <h1 className='text-4xl font-bold'>Welcome back</h1>
        <h2 className='text-xl'>Please enter your details to log in.</h2>
        <form className='flex flex-col w-4/12'>

          <label className='mt-10'>Email</label>
          <input type="email" placeholder="Enter your email" className="input input-bordered " />

          <label className='mt-10'>Password</label>
          <input type="email" placeholder="Enter your password" className="input input-bordered " />
          
          <button className="btn btn-accent mt-10 mb-16">Log in</button>
        </form>
      </div>
    </main>
  )
}

export default Login;


import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
         <div>
            <img src={assets.logo} className='mb-5 w-32' alt='' />
            <p className='w-full md:w-2/3 text-gray-600'>Bringing you quality products, smooth service, and a shopping experience you can trust.</p>
         </div>
        
        <div>
           <p className='text-xl font-medium mb-5'>COMPANY</p> 
           <ul className='flex flex-col gap-1 text-gray-600'>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>DELIVERY</li>
            <li>PRIVACY</li>
           </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-222-333-444</li>
                <li>forever@example.com</li>
            </ul>
        </div>

      </div>
      <div>
        <hr/>
        <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
// 1:50:33

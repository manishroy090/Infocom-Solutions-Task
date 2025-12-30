import React from 'react'

export default function page() {
  return (
    <div className='bg-indigo-800 h-screen w-screen flex items-center justify-center'>
      <div className='h-fit w-96 border p-2 rounded flex-col  space-y-8'>


        <div className=' text-center'>
          <h1>Login</h1>
        </div>

        <div>
          <label>Email</label>
          <input type="text" id="visitors" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
        </div>

        <div>
          <label>Password</label>
          <input type="text" id="visitors" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
        </div>
          <div>
          <label>Confirm Password</label>
          <input type="text" id="visitors" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
        </div>

<button type="button" class="text-black w-full bg-white box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Login</button>


        <div className='flex justify-center space-x-4 '>
          <span>Don't Have An Account</span>
          <a href='/signup'>Register Now</a>
        </div>

      </div>
    </div>
  )
}

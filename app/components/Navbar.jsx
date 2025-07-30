import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-slate-800'>
        <h1 className='text-center py-4 font-semibold text-3xl font-stretch-50%'>- Movies Database -</h1>
        <ul className='columns-2 bg-slate-700'>
            <li className='hover:bg-slate-500 duration-200 text-center py-3 '>Movie List</li>
            <li className='hover:bg-slate-500 duration-200 text-center py-3 '>Movie Form</li>
        </ul>
    </div>
  )
}

export default Navbar
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
            
        <div className="logo font-bold text-white text-2xl">
            <span className='text-green-700'>&lt;</span>
            <span></span>Pass<span className='text-green-700'>Protect/&gt;</span>
        </div>

       <a 
         href="https://github.com/AnkitaSikdar005/PassProtect_mern" 
         target="_blank" 
         rel="noopener noreferrer"
         className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center'
       >
        <img className='invert p-1 w-10' src="icons/github.svg" alt="github logo" />
        <span className='font-bold px-2'>Github</span>
       </a>
      </div>
    </nav>
  )
}

export default Navbar
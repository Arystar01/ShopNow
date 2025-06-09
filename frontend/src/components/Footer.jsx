//import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            ShopNow by Aryan is more than just a store — it's an innovation-driven platform built with cutting-edge tech to deliver quality, speed, and user-first experiences. As a full-stack project, it showcases powerful integrations, modern UI/UX, and a mission to simplify shopping in the AI age.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>EXPLORE</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to="/">Home</Link>
            <Link to="/about">About Me</Link>
            <Link to="/collection">Collection</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>CONNECT</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to='tel:91-8318627869'>📞 +91 83186 27869</Link>
            <Link to='mailto:aryan.rastogi.dev@gmail.com'>✉️ aryan.rastogi.dev@gmail.com</Link>
            <a href='https://github.com/aryanrastogi03' target='_blank' rel='noopener noreferrer'>💻 GitHub</a>
            <a href='https://linkedin.com/in/aryanrastogi03' target='_blank' rel='noopener noreferrer'>🔗 LinkedIn</a>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          © {new Date().getFullYear()} Aryan's ShopNow • Built with 💻, ❤️ & ☕
        </p>
      </div>
    </div>
  )
}

export default Footer

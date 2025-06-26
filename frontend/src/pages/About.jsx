import React from 'react'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <div className="text-center flex items-center justify-center text-3xl gap-2 font-bold text-gray-700">
          <h1 className="font-sans">ABOUT</h1>
          <h1 className="font-mono">US</h1>
        </div>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>ShopNow was founded with a vision to transform the online shopping experience. We started with a simple goal — to create a platform where people can effortlessly discover and purchase quality products from the comfort of their homes.</p>
          <p>From fashion and lifestyle to electronics and home essentials, ShopNow offers a curated selection of trusted products tailored to every need and style. We work closely with reliable brands and suppliers to bring you the best at your fingertips.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>At ShopNow, our mission is to deliver choice, convenience, and confidence. We’re committed to making shopping seamless and enjoyable — from browsing to checkout to delivery — with service you can count on every step of the way.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <div className="text-center flex items-center justify-center text-3xl gap-2 font-bold text-gray-700">
          <h1 className="font-sans">WHY</h1>
          <h1 className="font-mono">CHOOSE</h1>
          <h1 className="font-sans">US</h1>
        </div>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Every product listed on ShopNow is carefully reviewed to ensure it meets our high quality standards — so you always shop with confidence.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Enjoy a smooth and intuitive shopping experience through our easy-to-navigate platform, quick checkout, and reliable delivery.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our friendly support team is always ready to help — before, during, and after your purchase. Your satisfaction is our success.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About

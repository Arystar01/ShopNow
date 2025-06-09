import React from 'react';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div>
      {/* Heading */}
      <div className='text-center text-2xl pt-10 border-t'>
        <div className="text-center flex items-center justify-center text-3xl gap-2 font-bold text-gray-700">
          <h1 className="font-sans">CONTACT</h1>
          <h1 className="font-mono">US</h1>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 px-4'>
        {/* Image */}
        <img className='w-full md:max-w-[480px] object-cover rounded-md' src={assets.contact_img} alt="Contact" />

        {/* Text Info */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Head Office</p>
          <p className='text-gray-500'>
            24 Horizon Avenue<br />
            Sector 18, Gurgaon, India
          </p>
          <p className='text-gray-500'>
            Phone: +91 98182 12345<br />
            Email: support@shopnow.in
          </p>

          <p className='font-semibold text-xl text-gray-600'>Join Our Team</p>
          <p className='text-gray-500'>
            Explore exciting career opportunities across departments.
          </p>
          <button className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300'>
            View Open Roles
          </button>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;

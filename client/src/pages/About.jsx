import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-slate-700 mb-6">About Horizon Homes</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Welcome to Horizon Homes, where we believe in making your real estate dreams a reality. Our dedicated team of professionals is here to guide you through every step of the home buying or selling process, ensuring a seamless and enjoyable experience.
        </p>
        <p className="text-gray-700 mb-6 text-lg">
          With years of experience in the real estate market, Horizon Homes is committed to providing exceptional service and expertise. We understand that buying or selling a home is more than just a transaction; it’s a life-changing decision. That's why we are here to provide you with the personalized attention and support you deserve.
        </p>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6 text-lg">
          Our mission is to empower our clients with the knowledge and resources they need to make informed decisions. We strive to be the trusted advisors in your real estate journey, providing honest and transparent services that prioritize your best interests.
        </p>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 text-lg">
          <li>Experienced and knowledgeable agents</li>
          <li>Personalized attention to detail</li>
          <li>Comprehensive market analysis and insights</li>
          <li>Wide network of industry connections</li>
          <li>Commitment to integrity and transparency</li>
        </ul>
        <div className="text-center">
          <Link to={'/'}
          
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Start finding your dream house
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

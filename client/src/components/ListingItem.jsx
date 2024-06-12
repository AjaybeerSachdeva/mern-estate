import React from 'react'
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg
    transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
      <img src={listing.imageUrls[0] || 'https://lh6.googleusercontent.com/proxy/pY4RJooU7j2teGhMlq3Kok4i5rx1QzSso2cmxLc7cQOnwDUALJLo3YZO6FqpNqvrbSfY8kjT2Nnjs8k0cs_18mZyyJID1Xtsc01mNdolJtw'} alt="listing cover"
      className='h-[320px] sm:h-[175px] w-full 
      object-cover hover:scale-105  transition-transform duration:300'/>
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className='text-slate-700 font-semibold text-lg truncate'>{listing.name}</p>
        <div className='flex gap-1 items-center '>
        <MdLocationOn className='h-4 w-4  text-green-700'/>
        <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
        <p className='text-slate-500 mt-2 font-semibold'> $
            {listing.offer ? listing.discountPrice.toLocaleString('en-US'):
            listing.regularPrice.toLocaleString('en-US')}
            {listing.type==='rent' && ' / month'}
        </p>
        <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
                {listing.bedrooms > 1? `${listing.bedrooms} beds`:`${listing.bedrooms} bed`}
            </div>
            <div className='font-bold text-xs'>
                {listing.bathrooms > 1? `${listing.bathrooms} baths`:`${listing.bedrooms} bath`}
            </div>
        </div>
      </div>
      </Link>

    </div>
  )
}

import React from 'react'
import {
  MenuAlt3Icon,
  BadgeCheckIcon,
  LocationMarkerIcon,
  MailIcon
} from '@heroicons/react/solid'


const Header = () => {
  return (
    <div>
      <div className="flex items-center">
        <img
          lat="Photo Riyan Subekti"
          src="https://riyanz.me/media/profil/photo.jpg"
          className="rounded-full shadow-md block"
          width="40" height="40" />
        <div className="ml-5 block">
          <strong className="text-xl block text-[#031727]">
            Riyan Subekti
            <BadgeCheckIcon className="ml-2 w-4 h-4 text-[#3FC4B6] inline" />
          </strong>
          <span className="text-xs text-[#969696]">Front End Developer</span>
        </div>
      </div>

      <div className="ml-[60px]">
        <LocationMarkerIcon className="mr-[10px] w-[10px] text-[#F89F1E] inline" />
        <span className="text-[#969696] text-[11px]">Jakarta</span>
        <MailIcon className="ml-4 mr-[10px] w-[10px] text-[#F89F1E] inline" />
        <span className="text-[#969696] text-[11px]">riyansubekti1406@gmail.com</span>
      </div>
      
      <MenuAlt3Icon className="w-5 h-4 absolute right-5 top-10 text-[#3FC4B6] cursor-pointer" />
    </div>
  )
}

export default Header
import React from 'react'
import { PlusIcon } from '@heroicons/react/solid'

const Fab = () => {
  return (
      <div className="w-[60px] h-[60px] rounded-[50%] bg-[#E71D35] shadow-md fixed right-5 bottom-5">
        <PlusIcon className="text-white w-5 h-5 absolute bottom-5 right-5 cursor-pointer" />
      </div>
  )
}

export default Fab
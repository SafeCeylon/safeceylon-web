import React from 'react'

import { Input } from "@/components/ui/input";

const gMaps_search = () => {
  return (
    <div className='w-1/3'>
        <Input
            id='place-search-input'
            type='text'
            placeholder='Search for a place'
            className='w-full p-5  shadow-md shadow-gray-400 bg-white'
        />
    </div>
  )
}

export default gMaps_search
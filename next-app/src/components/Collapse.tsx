'use client'

import React from 'react'
import Button from './Button'

export default function Collapse() {
  return (
    <div className='flex gap-4 text-xs'>
      <Button className='hover:bg-blue-1 border border-gray-1 hover:text-white  inner-padding rounded-full py-2 px-4 sm:px-8 bg-gray-3'>
        Expand All
      </Button>
      <Button className='hover:bg-blue-1 border border-gray-1 hover:text-white  inner-padding rounded-full py-2 px-4 sm:px-8 bg-gray-3'>
        Collapse All
      </Button>
    </div>
  )
}

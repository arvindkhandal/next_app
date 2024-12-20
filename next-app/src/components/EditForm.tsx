'use client'

import React from 'react'

export default function Edit() {
  return (
    <form className='text-xs flex flex-col gap-3 w-full'>
      <div>
        <p>Menu ID</p>
        <input
          disabled
          type='text'
          value='sdjhfsdfffffff-sdf'
          className='mt-1 input-padding bg-gray-3 rounded-corner w-full sm:w-[60%]'
        />
      </div>
      <div>
        <p>Depth</p>
        <input
          disabled
          type='text'
          value='3'
          className='mt-1 input-padding bg-gray-3 rounded-corner w-full sm:w-[60%]'
        />
      </div>
      <div>
        <p>Parent Data</p>
        <input
          disabled
          type='text'
          value='System'
          className='mt-1 input-padding bg-gray-3 rounded-corner w-full sm:w-[60%]'
        />
      </div>
      <div>
        <p>Name</p>
        <input
          disabled
          type='text'
          value='System Code'
          className='mt-1 input-padding bg-gray-3 rounded-corner w-full sm:w-[60%]'
        />
      </div>
      <button className='input-padding text-sm rounded-full bg-blue-5 w-full sm:w-[60%] text-white bg-blue-3'>
        Save
      </button>
    </form>
  )
}

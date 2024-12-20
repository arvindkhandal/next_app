'use client'

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import downArrow from '../../public/down-arrow.svg'

type Node = {
  id: string
  name: string
  type: 'folder' | 'file'
  depth: number | null
  parentId: number
  children: Node[]
}

export default function MenuTree({ node }: { node: Node }) {
  const [open, setOpen] = useState(false)
  // const [showInput, setShowInput] = useState(null)

  // const onEnter = (e, id, isFolder, node) => {
  //   if (e.key === 'Enter') {
  //     add(id, e.target.value, isFolder, node)
  //     setShowInput(null)
  //     setOpen(true)
  //   }
  // }

  // const onAdd = (id, isFolder, node) => {
  //   const inputContent = isFolder ? '📁' : '🗄️'
  //   setShowInput(
  //     <div className='added-input'>
  //       {inputContent}
  //       <input
  //         type='text'
  //         autoFocus
  //         onBlur={() => {
  //           setShowInput(null)
  //         }}
  //         onKeyPress={(e) => onEnter(e, id, isFolder, node)}
  //       />
  //     </div>
  //   )
  // }

  return (
    <>
      <section className='node li'>
        {/* act as li */}
        <div className='title summary flex'>
          <span
            className='flex gap-2 items-center'
            onClick={() => setOpen(!open)}
          >
            {node.type === 'folder' ? (
              <Image
                src={downArrow}
                alt='title-icon'
              />
            ) : (
              ''
            )}{' '}
            {node.name}
          </span>
          {/* {node.isFolder && (
            <>
              <button
                className={`${showInput && 'event-none'}`}
                onClick={() => onAdd(node.id, true, node.items)}
              >
                Folder
              </button>
              <button
                className={`${showInput && 'event-none'}`}
                onClick={() => onAdd(node.id, false, node.items)}
              >
                File
              </button>
            </>
          )} */}
        </div>

        {/* {showInput} */}

        {node?.children?.map((child) => (
          <ul key={child.id}>
            <MenuTree
              node={child}
              // add={add}
            />
          </ul>
        ))}

        {/* {open &&
          node?.children?.map((child) => (
            <ul>
              <MenuTree
                key={child.id}
                node={child}
                // add={add}
              />
            </ul>
          ))} */}
      </section>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import downArrow from '../../public/down-arrow.svg'
import addIcon from '../../public/add-icon.svg'
import editIcon from '../../public/edit-icon.svg'
import trashIcon from '../../public/trash-icon.svg'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import {
  setAddForm,
  setNode,
  setUpdateForm,
} from '@/lib/redux/slices/formSlice'
import { Node } from '@/types'
import { deleteMenuAsync } from '@/lib/redux/slices/menuSlice'

export default function MenuTree({ node }: { node: Node }) {
  const dispatch = useAppDispatch()
  const showAllMenu = useAppSelector((state) => state.menu.showAllMenu)
  const [state, setState] = useState({
    open: showAllMenu,
    add: false,
    edit: false,
    trash: false,
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, open: showAllMenu }))
  }, [showAllMenu])

  return (
    <>
      <div className='node'>
        <div
          onMouseEnter={() => {
            setState((prev) => ({
              ...prev,
              edit: true,
              add: true,
              trash: true,
            }))
          }}
          onMouseLeave={() => {
            setState((prev) => ({
              ...prev,
              edit: false,
              add: false,
              trash: false,
            }))
          }}
          className={`${
            node?.children?.length ? 'cursor-pointer' : ''
          } title summary flex gap-2 items-center`}
        >
          <span
            onClick={() =>
              setState((prev) => ({
                ...prev,
                open: !prev.open,
              }))
            }
            className='flex gap-2 items-center'
          >
            {node?.children?.length ? (
              <Image
                src={downArrow}
                alt='title-icon'
                className={`${!state.open ? '-rotate-90' : ''} `}
              />
            ) : null}
            {node?.name}
          </span>

          {state.add && (
            <button
              onClick={() => {
                dispatch(setAddForm(true))
                dispatch(setUpdateForm(false))
                dispatch(setNode(node))
              }}
            >
              <Image
                src={addIcon}
                alt='Add Iocn'
                height={20}
              />
            </button>
          )}
          {state.edit && (
            <button
              onClick={() => {
                dispatch(setUpdateForm(true))
                dispatch(setAddForm(false))
                dispatch(setNode(node))
              }}
            >
              <Image
                src={editIcon}
                alt='Add Iocn'
                height={20}
              />
            </button>
          )}
          {state.trash && (
            <button
              onClick={() => {
                dispatch(deleteMenuAsync({ id: node?.id.toString() }))
              }}
            >
              <Image
                src={trashIcon}
                alt='trash Iocn'
                height={20}
              />
            </button>
          )}
        </div>

        {state.open &&
          node?.children?.map((child) => (
            <ul key={child.id}>
              <MenuTree node={child} />
            </ul>
          ))}
      </div>
    </>
  )
}

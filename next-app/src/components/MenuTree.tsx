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
  const addForm = useAppSelector((state) => state.form.addForm)
  const updateForm = useAppSelector((state) => state.form.updateForm)
  const [state, setState] = useState({
    open: showAllMenu,
    add: false,
    edit: false,
    trash: false,
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, open: showAllMenu }))
  }, [showAllMenu])

  function handleDelete(id: string) {
    dispatch(deleteMenuAsync({ id: id }))
  }

  return (
    <>
      <div className='node li'>
        {/* act as li */}
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
          className={`title summary flex gap-2 items-center ${
            node?.type === 'folder' ? 'cursor-pointer' : ''
          }`}
        >
          <span
            onClick={
              node?.type === 'folder'
                ? () =>
                    setState((prev) => ({
                      ...prev,
                      open: !prev.open,
                    }))
                : undefined
            }
            className='flex gap-2 items-center'
          >
            {node?.type === 'folder' && node?.children?.length ? (
              <Image
                src={downArrow}
                alt='title-icon'
                className={`${!state.open ? '-rotate-90' : ''} `}
              />
            ) : (
              <Image
                src={downArrow}
                alt='title-icon'
                className='invisible'
              />
            )}{' '}
            {node?.name}
          </span>

          {node?.type === 'folder' && state.add && (
            <>
              <button
                onClick={() => {
                  if (node) {
                    if (addForm) {
                      dispatch(setAddForm(false))
                    } else {
                      dispatch(setAddForm(true))
                    }
                    dispatch(setUpdateForm(false))
                    dispatch(setNode(node))
                  }
                }}
              >
                <Image
                  src={addIcon}
                  alt='Add Iocn'
                  height={20}
                />
              </button>
            </>
          )}
          {state.edit && (
            <button
              onClick={() => {
                if (node) {
                  if (updateForm) {
                    dispatch(setUpdateForm(false))
                  } else {
                    dispatch(setUpdateForm(true))
                  }
                  dispatch(setAddForm(false))
                  dispatch(setNode(node))
                }
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
                if (node) {
                  handleDelete(node?.id.toString())
                }
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

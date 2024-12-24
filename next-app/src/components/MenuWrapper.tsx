'use client'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setMenuTree } from '@/lib/redux/slices/menuSlice'
import MenuTree from './MenuTree'
import addIcon from '../../public/add-icon.svg'
import {
  setAddForm,
  setNode,
  setUpdateForm,
} from '@/lib/redux/slices/formSlice'
import Image from 'next/image'

export default function MenuWrapper({ node }: { node: Node }) {
  const rootNode = useAppSelector((state) => state.menu.menuTree)
  const addForm = useAppSelector((state) => state.form.addForm)
  const dispatch = useAppDispatch()
  console.log(rootNode)

  useEffect(() => {
    dispatch(setMenuTree(node))
  }, [node, dispatch])

  if (!rootNode)
    return (
      <>
        <button
          className='w-fit'
          onClick={() => dispatch(setAddForm(true))}
        >
          <Image
            src={addIcon}
            alt='Add Iocn'
            height={20}
          />
        </button>
      </>
    )

  return (
    <>
      <ul>{rootNode && <MenuTree node={rootNode} />}</ul>
    </>
  )
}
'use client'

import { Node } from '@/types'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export const addMenuAsync = createAsyncThunk(
  'addMenu/status',
  async ({
    name,
    depth,
    parentId,
  }: {
    name: string
    depth: number
    parentId: number | undefined
  }) => {
    const menuData = {
      name,
      depth,
      parentId,
    }
    const res = await fetch('http://localhost:3000/api/menu', {
      method: 'POST',
      body: JSON.stringify(menuData),
    })
    const data = await res.json()
    return data?.rootNode
  }
)

export const updateMenuAsync = createAsyncThunk(
  'updateMenu/status',
  async ({ id, name }: { id: string; name: string }) => {
    const res = await fetch(
      `http://localhost:3000/api/menu/${id}?name=${name}`,
      {
        method: 'PUT',
      }
    )
    const data = await res.json()
    return data?.rootNode
  }
)

export const deleteMenuAsync = createAsyncThunk(
  'deleteMenu/status',
  async ({ id }: { id: string }) => {
    const res = await fetch(`http://localhost:3000/api/menu/${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    return data?.rootNode
  }
)

type MenuState = {
  showAllMenu: boolean
  menuTree: Node | undefined
}

const initialState: MenuState = {
  showAllMenu: true,
  menuTree: undefined,
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setShowAllMenu: (state, action: PayloadAction<boolean>) => {
      state.showAllMenu = action.payload
    },
    setMenuTree: (state, action) => {
      state.menuTree = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Add menu
      .addCase(addMenuAsync.fulfilled, (state, action: PayloadAction<Node>) => {
        state.menuTree = action.payload
      })
      //  Update menu
      .addCase(
        updateMenuAsync.fulfilled,
        (state, action: PayloadAction<Node>) => {
          state.menuTree = action.payload
        }
      )
      //  Delete menu
      .addCase(
        deleteMenuAsync.fulfilled,
        (state, action: PayloadAction<Node>) => {
          state.menuTree = action.payload
        }
      )
  },
})

export const { setShowAllMenu, setMenuTree } = menuSlice.actions
export default menuSlice.reducer

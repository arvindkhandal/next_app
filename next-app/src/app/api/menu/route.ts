import { type NextRequest, NextResponse } from 'next/server'
import db from '@/db'

// Get all menus
export async function GET() {
  try {
    const rootNode = await db.menuNode.findFirst({
      where: {
        parentId: null,
        depth: 0,
      },
      include: {
        children: {
          select: {
            id: true,
            name: true,
            type: true,
            depth: true,
            parentId: true,
            children: true,
          },
        },
      },
    })

    return NextResponse.json({
      rootNode,
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// Add a node
export async function POST(req: Request) {
  try {
    const {
      name,
      type,
      depth,
      parentId,
    }: {
      name: string
      type: 'folder' | 'file'
      depth: number
      parentId: number | undefined
    } = await req.json()

    console.log(name, type, depth, parentId)

    if (!name || !type || typeof depth !== 'number') {
      return NextResponse.json(
        {
          message: 'missing fields',
        },
        { status: 200 }
      )
    }

    if (!parentId) {
      parentId === undefined ? null : parentId
      // check is it a root node
    }
    console.log('run')

    const newNode = await db.menuNode.create({
      data: {
        name,
        type,
        depth,
        parentId: parentId || null,
      },
    })

    return NextResponse.json({
      newNode,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

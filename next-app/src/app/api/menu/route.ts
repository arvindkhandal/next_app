import { NextResponse } from 'next/server'
import db from '@/db'

type NodeType = 'folder' | 'file'

interface MenuNode {
  id: number
  name: string
  type: NodeType
  depth: number
  parentId: number | null
  children: MenuNode[]
}

// Get all menus
export async function GET() {
  try {
    const result = await fetchMenuTree()

    if (!result.rootNode) {
      return NextResponse.json(
        { message: 'Root node not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'An error occurred while fetching the menu tree.' },
      { status: 500 }
    )
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

    const newNode = await db.menuNode.create({
      data: {
        name,
        type,
        depth,
        parentId: parentId || null,
      },
    })

    if (newNode) {
      const result = await fetchMenuTree()
      return NextResponse.json(result)
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function fetchMenuTree(): Promise<{ rootNode: MenuNode | null }> {
  const rootNode = await db.menuNode.findFirst({
    where: { depth: 0, parentId: null },
  })

  if (!rootNode) return { rootNode: null }

  return {
    rootNode: await getNestedMenuNode(rootNode.id),
  }
}

async function getNestedMenuNode(nodeId: number): Promise<MenuNode | null> {
  const node = await db.menuNode.findUnique({
    where: { id: nodeId },
    include: { children: true },
  })

  if (!node) return null

  return {
    id: node.id,
    name: node.name,
    type: node.type as NodeType,
    depth: node.depth,
    parentId: node.parentId,
    children: (await Promise.all(
      node.children.map(async (child) => await getNestedMenuNode(child.id))
    )) as MenuNode[],
  }
}

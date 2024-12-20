import { type NextRequest, NextResponse } from 'next/server'
import db from '@/db'

// Update and pass name in search query
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const searchParams = req.nextUrl.searchParams
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json(
      { message: 'name query required' },
      { status: 400 }
    )
  }

  try {
    const updatedNode = await db.menuNode.update({
      where: { id: parseInt(id, 10) },
      data: { name },
    })
    return NextResponse.json(
      {
        updatedNode,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

// Delete
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  try {
    await db.menuNode.delete({
      where: { id: parseInt(id, 10) },
    })

    return NextResponse.json({ message: 'Node deleted' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}

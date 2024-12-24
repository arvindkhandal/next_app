export type Node = {
  id: number
  name: string
  type: 'folder' | 'file'
  depth: number
  parentId?: number | undefined
  children?: Node[] | undefined
}

import React, { ReactNode } from 'react'

export default function Button({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className: string
  onClick?: () => void
}) {
  return <button className={className}>{children}</button>
}

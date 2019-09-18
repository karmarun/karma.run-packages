import React from 'react'

export interface ImageThumbProps {
  src: string
  size: string
  name: string
}

export function ImageThumb({src, size, name}: ImageThumbProps) {
  return (
    <div>
      <img src={src} />
      <div>{size}</div>
      <div>{name}</div>
    </div>
  )
}

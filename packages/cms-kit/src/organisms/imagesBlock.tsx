import React, {useState} from 'react'
import {AccessoryBar} from '../molecules/accessoryBar'
import {FavorButtonProps} from '../atoms/favorButton'

export interface Image {
  src: string
  description: string
}

export interface ImagesBlockProps {
  images: Image[]
  isLead: FavorButtonProps
  onEdit(): void
}

export function ImagesBlock({images, isLead, onEdit}: ImagesBlockProps) {
  const isGallery = images.length > 1

  const [current, setCurrent] = useState(0)

  function onPrevious() {
    if (current - 1 < 0) {
      setCurrent(images.length - 1)
    } else {
      setCurrent(current - 1)
    }
  }

  function onNext() {
    if (current + 1 == images.length) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }

  return (
    <>
      <AccessoryBar
        onEdit={onEdit}
        isLead={isLead}
        onPrevious={isGallery ? onPrevious : undefined}
        onNext={isGallery ? onNext : undefined}
      />
      <img src={images[current].src} />
      <div>
        {isGallery && (
          <>
            {current + 1} / {images.length}
          </>
        )}{' '}
        {images[current].description}
      </div>
    </>
  )
}

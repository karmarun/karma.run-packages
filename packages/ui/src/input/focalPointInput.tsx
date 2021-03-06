import React, {useRef, useState, useLayoutEffect} from 'react'

import {Icon} from '../data/icon'
import {FontSize} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {MaterialIconCenterFocusStrong} from '@karma.run/icons'
import {Image} from '../data/image'
import {DraggableContainer, Draggable, Point} from '../interaction/draggable'
import {styled} from '@karma.run/react'
import {Card} from '../data/card'
import {Box} from '../layout/box'

const FocalPointInputWrapper = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'FocalPointInput' : undefined,

  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
}))

export interface FocalPointInputProps {
  imageURL: string
  imageWidth: number
  imageHeight: number
  maxHeight: number

  focalPoint?: Point | null
  disabled?: boolean

  onChange?: (point: Point) => void
}

export function FocalPointInput({
  imageURL,
  imageWidth,
  imageHeight,
  maxHeight,
  focalPoint,
  disabled,
  onChange
}: FocalPointInputProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainer = useRef<HTMLDivElement>(null)

  const [layouted, setLayouted] = useState(false)

  useLayoutEffect(() => {
    function layout() {
      const containerWidth = containerRef.current!.clientWidth
      const imageAspectRatio = imageWidth / imageHeight

      let imageContainerWidth = containerWidth
      let imageContainerHeight = containerWidth / imageAspectRatio

      if (imageContainerHeight > maxHeight) {
        imageContainerWidth = maxHeight * imageAspectRatio
        imageContainerHeight = maxHeight
      }

      imageContainer.current!.style.width = `${imageContainerWidth}px`
      imageContainer.current!.style.height = `${imageContainerHeight}px`
    }

    function handleResize() {
      layout()
    }

    layout()
    setLayouted(true)

    // TODO: Consider using ResizeObserver
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <FocalPointInputWrapper ref={containerRef}>
      <div ref={imageContainer}>
        {layouted && (
          <Box position="relative" width="100%" height="100%">
            <Card overflow="hidden" width="100%" height="100%">
              <Image
                src={imageURL}
                width="100%"
                height="100%"
                imageWidth={imageWidth}
                imageHeight={imageHeight}
              />
            </Card>
            <Box position="absolute" top={0} left={0} width="100%" height="100%">
              <DraggableContainer>
                {focalPoint && (
                  <Draggable point={focalPoint} onChange={onChange} disabled={disabled}>
                    <FocalPoint />
                  </Draggable>
                )}
              </DraggableContainer>
            </Box>
          </Box>
        )}
      </div>
    </FocalPointInputWrapper>
  )
}

const FocalPointStyle = cssRuleWithTheme(({theme}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'FocalPoint' : undefined,

  width: 50,
  height: 50,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',

  borderRadius: '100%',
  border: `1px solid ${theme.colors.white}`,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fill: theme.colors.white,
  fontSize: FontSize.Heading3,

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
}))

export function FocalPoint() {
  const css = useThemeStyle()

  return (
    <div className={css(FocalPointStyle)}>
      <Icon element={MaterialIconCenterFocusStrong} />
    </div>
  )
}

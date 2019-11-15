import React, {useState} from 'react'

import {OptionButtonSmall} from '../input/buttons/optionButtonSmall'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import { Spacing, BorderWidth, FontSize} from '../style/helpers'
import {MaterialIconKeyboardArrowUp, MaterialIconKeyboardArrowDown} from '@karma.run/icons'
import {Button} from '../input/buttons/button'

export interface GalleryImage {
  readonly id: string
  readonly src: string
  readonly name: string
}

export interface GalleryMakerProps {
  readonly images: GalleryImage[]
  onUpdate(images: GalleryImage[]): void
  onRemove(id: string): void
}

export function GalleryMaker({images, onUpdate, onRemove}: GalleryMakerProps): JSX.Element {
  const [imagesState, setImagesState] = useState(images)

  function moveUp(index: number) {
    let newOrder = imagesState.map((img, i) => {
      if (i == index - 1) {
        return imagesState[index]
      }
      if (i == index) {
        return imagesState[index - 1]
      }
      return img
    })

    setImagesState(newOrder)
  }

  function moveDown(index: number) {
    let newOrder = imagesState.map((img, i) => {
      if (i == index) {
        return imagesState[index + 1]
      }
      if (i == index + 1) {
        return imagesState[index]
      }
      return img
    })

    setImagesState(newOrder)
  }

  function confirmNewOrder() {
    onUpdate(imagesState)
  }

  return (
    <GalleryMakerList
      images={imagesState}
      onConfirm={confirmNewOrder}
      onRemove={onRemove}
      onMoveUp={moveUp}
      onMoveDown={moveDown}
    />
  )
}

/**
 *
 * Gallery Maker View
 */
const GalleryMakerStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.dark,
  padding: Spacing.Small
}))

const GalleryMakerFooterStyle = cssRuleWithTheme(({theme}) => ({
  width: '100%',
  textAlign: 'right',
  marginTop: Spacing.Small
}))

export interface GalleryMakerListProps {
  readonly images: GalleryImage[]
  onMoveUp(index: number): void
  onMoveDown(index: number): void
  onRemove(id: string): void
  onConfirm(): void
}

export function GalleryMakerList({
  images,
  onMoveUp,
  onMoveDown,
  onConfirm,
  onRemove
}: GalleryMakerListProps): JSX.Element {
  const css = useThemeStyle()
  return (
    <div className={css(GalleryMakerStyle)}>
      {images.map((image, index) => (
        <GalleryMakerItem
          key={index}
          image={image}
          onRemove={() => onRemove(image.id)}
          onMoveUp={index > 0 ? () => onMoveUp(index) : undefined}
          onMoveDown={index < images.length - 1 ? () => onMoveDown(index) : undefined}
        />
      ))}
      <div className={css(GalleryMakerFooterStyle)}>
        <Button variant="outlined" label={'Update'} onClick={() => onConfirm()} />
      </div>
    </div>
  )
}

/**
 *
 *
 */
const GalleryMakerItemStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  minHeight: 88,
  color: theme.colors.white,
  borderBottom: `${BorderWidth.Small} solid ${theme.colors.white}`
}))

const GalleryMakerItemImageStyle = cssRuleWithTheme(({theme}) => ({
  minWidth: 200,
  display: 'flex',
  alignItems: 'center',
  fontSize: FontSize.Small,

  '> span': {
    marginLeft: Spacing.ExtraSmall
  }
}))

const GalleryMakerItemOptionStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  alignItems: 'center',

  '> button': {
    marginRight: Spacing.ExtraSmall
  }
}))

const GalleryMakerItemMoverStyle = cssRuleWithTheme(({theme}) => ({
  '> button': {
    marginTop: Spacing.Tiny,
    marginBottom: Spacing.Tiny
  }
}))

export interface GalleryImageThumb {
  readonly src: string
  readonly name: string
}

export interface GalleryMakerItemProps {
  readonly image: GalleryImageThumb
  onMoveUp?(): void
  onMoveDown?(): void
  onRemove(): void
}

export function GalleryMakerItem({image, onMoveUp, onMoveDown, onRemove}: GalleryMakerItemProps) {
  const css = useThemeStyle()
  return (
    <div>
      <div className={css(GalleryMakerItemStyle)}>
        <div className={css(GalleryMakerItemImageStyle)}>
          <img src={image.src} />
          <span>{image.name}</span>
        </div>
        <div className={css(GalleryMakerItemOptionStyle)}>
          <Button variant="text" label={'Remove'} onClick={() => onRemove()} />
          <div className={css(GalleryMakerItemMoverStyle)}>
            <OptionButtonSmall
              title="Move Up"
              icon={MaterialIconKeyboardArrowUp}
              onClick={() => {
                if (onMoveUp) onMoveUp()
              }}
              disabled={onMoveUp == undefined}
            />
            <OptionButtonSmall
              title="Move Down"
              icon={MaterialIconKeyboardArrowDown}
              onClick={() => {
                if (onMoveDown) onMoveDown()
              }}
              disabled={onMoveDown == undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

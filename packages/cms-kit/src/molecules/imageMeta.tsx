import React, {useState} from 'react'

import {Icon, IconType, IconScale} from '../atoms/icon'
import {pxToRem} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {cssRule} from '@karma.run/react'
import {Spacing} from '../style/helpers'

export const ImageMetaStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.dark,
  padding: pxToRem(Spacing.Small)
}))

export type File = {
  src: string
  name: string
  width: number
  height: number
  date: string
  size: number
  link: string
}

export interface ImageMetaProps {
  readonly file: File
}

export function ImageMeta({file}: ImageMetaProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(ImageMetaStyle)}>
      <FocalPointSetter imgSrc={file.src} width={file.width} height={file.height} />
      <ImageMetaItem label={'File name'} value={file.name} />
      <ImageMetaItem label={'Dimensions'} value={`${file.width} x ${file.height} px`} />
      <ImageMetaItem label={'Upload date'} value={file.date} />
      <ImageMetaItem label={'File size'} value={`${file.size} MB`} />
      <ImageMetaItem label={'Link'} value={file.link} />
    </div>
  )
}

export const ImageMetaItemStyle = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.white,
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: pxToRem(Spacing.Tiny),
  paddingBottom: pxToRem(Spacing.Tiny)
}))

const ImageMetaLabel = cssRuleWithTheme(({theme}) => ({
  color: theme.colors.gray
}))

const ImageMetaRight = cssRuleWithTheme(({theme}) => ({}))

export interface ImageMetaItemProps {
  label: string
  value: string
}
export function ImageMetaItem({label, value}: ImageMetaItemProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(ImageMetaItemStyle)}>
      <span className={css(ImageMetaLabel)}>{label}</span>
      <span className={css(ImageMetaRight)}>{value}</span>
    </div>
  )
}

/**
 *
 * Focal Point Setter
 * TODO use React DnD ?
 */
const DragContainerStyle = cssRule({
  position: 'relative'
})
const DraggableFocalPointStyle = cssRuleWithTheme<Point2D>(({x, y, theme}) => ({
  position: 'absolute',
  top: pxToRem(y - FocalPointSize / 2),
  left: pxToRem(x - FocalPointSize / 2)
}))

export type Point2D = {x: number; y: number}

export interface FocalPointSetterProps {
  imgSrc: string
  width?: number
  height?: number
  focalPoint?: Point2D
  onFocalPointChange?(newPost: Point2D): void
}

export function FocalPointSetter({
  imgSrc,
  width,
  height,
  focalPoint: position = {x: 440 / 2, y: 290 / 2},
  onFocalPointChange
}: FocalPointSetterProps) {
  const [pos, setPos] = useState(position)
  const {css} = useThemeStyle(pos)

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    let data = e.dataTransfer.getData('startPos').split(',')
    setPos({x: pos.x - (parseInt(data[0]) - e.clientX), y: pos.y - (parseInt(data[1]) - e.clientY)})

    if (onFocalPointChange) {
      onFocalPointChange(pos)
    }
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData('startPos', `${e.clientX},${e.clientY}`)
  }

  return (
    <div
      className={css(DragContainerStyle)}
      onDragOver={e => e.preventDefault()}
      onDrop={e => handleDrop(e)}>
      <img src={imgSrc} width={width} height={height} />
      <div draggable className={css(DraggableFocalPointStyle)} onDragStart={handleDragStart}>
        <FocalPoint />
      </div>
    </div>
  )
}

/**
 *
 * Focal Point Icon
 */
export const FocalPointSize = 50
export const FocalPointStyle = cssRuleWithTheme(({theme}) => ({
  cursor: 'pointer',

  width: pxToRem(FocalPointSize),
  height: pxToRem(FocalPointSize),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },

  borderRadius: '100%',
  border: `1px solid ${theme.colors.white}`,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fill: theme.colors.white,
  fontSize: IconScale.Double
}))

export interface FocalPointProps {}

export function FocalPoint({}: FocalPointProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(FocalPointStyle)}>
      <Icon type={IconType.Focus} />
    </div>
  )
}

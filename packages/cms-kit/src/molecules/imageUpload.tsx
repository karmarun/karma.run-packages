import React, {useState} from 'react'

import {IconType, Icon, IconScale} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'
import {pxToRem, FontSize} from '../style/helpers'
import {cssRule} from '@karma.run/react'

const ImageUploadStyle = cssRuleWithTheme<{dragging: boolean; inProcess: boolean}>(
  ({dragging, inProcess, theme}) => ({
    display: 'flex',
    borderRadius: pxToRem(3),
    border: dragging
      ? `1px dashed ${theme.colors.action}`
      : `1px dashed ${theme.colors.actionDark}`,
    position: 'relative',
    cursor: inProcess ? 'not-allowed' : 'default'
  })
)

const ThumbStyle = cssRuleWithTheme<{inProcess: boolean}>(({inProcess}) => ({
  opacity: inProcess ? 0.4 : 1
}))

const DragOverStyle = cssRule({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.7)'
})

export interface ImageUploadProps {
  readonly images: ImageUploadThumbProps[]
  readonly isProcessing: boolean
  onDelete(id: string): void
  onDrop(files: FileList): void
}

export function ImageUpload({
  images,
  isProcessing,
  onDelete: onDeleteImage,
  onDrop
}: ImageUploadProps) {
  const [{dragging, dragCount}, setDragging] = useState({dragging: false, dragCount: 0})
  const {css} = useThemeStyle({dragging: dragging, inProcess: isProcessing})

  function handleDrag(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDragIn(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragging({dragging: true, dragCount: dragCount + 1})
  }

  function handleDragOut(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()

    if (dragCount - 1 == 0) {
      setDragging({dragging: false, dragCount: dragCount - 1})
    } else {
      setDragging({dragging: dragging, dragCount: dragCount - 1})
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.stopPropagation()

    setDragging({dragging: false, dragCount: 0})

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      onDrop(event.dataTransfer.files)
      event.dataTransfer.clearData()
    }
  }

  function getState() {
    if (images.length == 0) return UploadState.Empty
    else if (isProcessing) return UploadState.InProcess
    else return UploadState.Upload
  }

  return (
    <div
      className={css(ImageUploadStyle)}
      onDrop={!isProcessing ? handleDrop : undefined}
      onDragOver={!isProcessing ? handleDrag : undefined}
      onDragEnter={!isProcessing ? handleDragIn : undefined}
      onDragLeave={!isProcessing ? handleDragOut : undefined}>
      <ImageUploadIcon state={getState()} />
      {images.map((img, idx) => (
        <div key={idx} className={css(ThumbStyle)}>
          <OptionButtonSmall
            disabled={isProcessing}
            icon={IconType.Close}
            onClick={() => onDeleteImage(img.id)}
          />
          <ImageUploadThumb id={img.id} src={img.src} size={img.size} name={img.name} />
        </div>
      ))}

      {dragging && (
        <div className={css(DragOverStyle)}>
          <ImageUploadIcon state={UploadState.DragOver} />
        </div>
      )}
    </div>
  )
}

/**
 *
 * upload icon and info text component
 */
const UploadInfoStyle = cssRuleWithTheme<{inProcess: boolean}>(({inProcess, theme}) => ({
  color: inProcess ? theme.colors.primary : theme.colors.action,
  fill: inProcess ? theme.colors.primary : theme.colors.action,

  fontSize: pxToRem(FontSize.Small),
  textAlign: 'center'
}))

const UploadInfoLabelStyle = cssRuleWithTheme<{inProcess: boolean}>(({inProcess, theme}) => ({}))

export enum UploadState {
  Empty,
  Upload,
  DragOver,
  InProcess
}

export interface ImageUploadIconProps {
  state: UploadState
}

export function ImageUploadIcon({state}: ImageUploadIconProps) {
  const isInProcess = state == UploadState.InProcess
  const {css} = useThemeStyle({inProcess: isInProcess})

  function getInfoText() {
    switch (state) {
      case UploadState.Empty:
        return 'drop image here or click to upload'

      case UploadState.Upload:
        return 'upload all'

      case UploadState.InProcess:
        return 'in process'

      case UploadState.DragOver:
        return 'drop here'
    }
  }

  return (
    <div className={css(UploadInfoStyle)}>
      <Icon type={isInProcess ? IconType.Created : IconType.Upload} scale={IconScale.Double} />
      <div className={css(UploadInfoLabelStyle)}>{getInfoText()}</div>
    </div>
  )
}

/**
 *
 * image thumb
 */
export interface ImageUploadThumbProps {
  readonly id: string
  readonly src: string
  readonly size: string
  readonly name: string
}

export function ImageUploadThumb({src, size, name}: ImageUploadThumbProps) {
  return (
    <div>
      <img src={src} />
      <div>{size}</div>
      <div>{name}</div>
    </div>
  )
}

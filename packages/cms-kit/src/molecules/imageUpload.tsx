import React from 'react'
import {IconType, Icon} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle, CSSRuleWithTheme} from '../style/themeContext'
import {ImageThumbProps, ImageThumb} from '../atoms/imageThumb'
import {OptionButtonSmall} from '../atoms/optionButtonSmall'

export interface ImageUploadProps {
  images: ImageThumbProps[]
  isProcessing: boolean
}

export function ImageUpload(props: ImageUploadProps) {
  const info = {
    initial: 'drop image here or click to upload',
    upload: 'upload all',
    processing: 'in process'
  }

  return (
    <div>
      <ImageUploadIcon icon={IconType.Upload} text={info.initial} color={'action'} />
      {props.images.map(img => (
        <div>
          <OptionButtonSmall
            icon={IconType.Close}
            onClick={() => {
              'click'
            }}
          />
          <ImageThumb src={img.src} size={img.size} name={img.name} />
        </div>
      ))}
    </div>
  )
}

const ImageUploadIconStyle = cssRuleWithTheme<{color: string}>(({color, theme}) => ({
  color: color,
  fill: color
}))

export interface ImageUploadIconProps {
  icon: IconType
  text: string
  color: string
}

export function ImageUploadIcon({icon, text, color}: ImageUploadIconProps) {
  const {css} = useThemeStyle({color: color})
  return (
    <div className={css(ImageUploadIconStyle)}>
      <Icon type={icon} />
      <div>{text}</div>
    </div>
  )
}

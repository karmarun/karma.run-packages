import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {IconType, Icon, IconSize} from '../atoms/icon'

export const IconButtonStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  border: 'none',
  height: pxToRem(iconSize)
}))

const IconStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  height: pxToRem(iconSize)
}))

export interface IconButtonProps extends ButtonProps {
  readonly icon: IconType
  readonly iconSize: IconSize
  onClick(): void
}

export function IconButton({icon, iconSize, href, onClick}: IconButtonProps) {
  const {css} = useThemeStyle({iconSize: iconSize})
  return (
    <Button href={href} onClick={onClick} className={css(IconButtonStyle)}>
      <Icon type={icon} className={css(IconStyle)} />
    </Button>
  )
}

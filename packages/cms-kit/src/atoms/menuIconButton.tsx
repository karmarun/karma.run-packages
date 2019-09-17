import React from 'react'
import {ButtonProps, Button} from '../atoms/button'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'
import {IconType, Icon, IconSize} from '../atoms/icon'

export const MenuIconButtonStyle = cssRuleWithTheme(({theme}) => ({
  display: 'block',
  backgroundColor: theme.colors.light,
  border: 'none',

  '& path': {
    fill: theme.colors.dark
  },
  '&:hover:enabled': {
    backgroundColor: theme.colors.grayLight
  },
  '&:hover:enabled path': {
    fill: theme.colors.dark
  },
  '&:active': {
    backgroundColor: theme.colors.white
  },
  '&:active path': {
    fill: theme.colors.primary
  }
}))

const IconStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  height: pxToRem(iconSize)
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({}))

export interface MenuIconButtonProps extends ButtonProps {
  readonly icon: IconType
  readonly iconSize: IconSize
  readonly label?: string
}

export function MenuIconButton({label, icon, iconSize, href, onClick}: MenuIconButtonProps) {
  const {css} = useThemeStyle({iconSize: iconSize})
  return (
    <Button href={href} onClick={onClick} className={css(MenuIconButtonStyle)}>
      <>
        <Icon type={icon} className={css(IconStyle)} />
        <span className={css(LabelStyle)}>{label}</span>
      </>
    </Button>
  )
}

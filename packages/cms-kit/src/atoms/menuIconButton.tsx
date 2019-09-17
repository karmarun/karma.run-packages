import React from 'react'
import {BaseButton, BaseButtonProps} from '../atoms/baseButton'
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

export interface MenuIconButtonProps extends BaseButtonProps {
  readonly icon: IconType
  readonly iconSize: IconSize
}

export function MenuIconButton({title, icon, iconSize, href, onClick}: MenuIconButtonProps) {
  const {css} = useThemeStyle({iconSize: iconSize})
  return (
    <BaseButton href={href} onClick={onClick} style={MenuIconButtonStyle}>
      <>
        <Icon type={icon} style={IconStyle} styleProps={{iconSize: iconSize}} />
        <span className={css(LabelStyle)}>{title}</span>
      </>
    </BaseButton>
  )
}

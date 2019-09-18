import React from 'react'
import {BaseButton, BaseButtonProps} from '../atoms/baseButton'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToEm} from '../style/helpers'
import {IconType, Icon, IconSize} from '../atoms/icon'
import {FontSize} from '../style/fontSizes'

export const MenuIconButtonStyle = cssRuleWithTheme(({theme}) => ({
  display: 'block',
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
  '&:active:enabled': {
    backgroundColor: theme.colors.white
  },
  '&:active:enabled path': {
    fill: theme.colors.primary
  }
}))

const IconStyle = cssRuleWithTheme<{iconSize: IconSize}>(({iconSize, theme}) => ({
  fontSize: pxToEm(iconSize)
}))

const LabelStyle = cssRuleWithTheme(({theme}) => ({
  verticalAlign: 'middle',
  paddingLeft: '5px',
  fontSize: pxToEm(FontSize.Default)
}))

export interface MenuIconButtonProps extends BaseButtonProps {
  readonly icon: IconType
  readonly iconSize: IconSize
}

export function MenuIconButton({title, icon, iconSize, href, onClick, style}: MenuIconButtonProps) {
  const {css} = useThemeStyle({iconSize: iconSize})
  // TODO how to use style? how to use either item or array?
  return (
    <BaseButton href={href} onClick={onClick} style={MenuIconButtonStyle}>
      <>
        <Icon type={icon} style={IconStyle} styleProps={{iconSize: iconSize}} />
        <span className={css(LabelStyle)}>{title}</span>
      </>
    </BaseButton>
  )
}

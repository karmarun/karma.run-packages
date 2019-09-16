import React from 'react'
import {IconType, Icon, IconSize} from './icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem} from '../style/helpers'

export const FilterTagStyle = cssRuleWithTheme(({theme}) => ({
  backgroundColor: theme.colors.action
}))

const IconButtonStyle = cssRuleWithTheme(({theme}) => ({
  border: 'none',
  backgroundColor: theme.colors.action,
  outline: 'none'
}))

const IconStyle = cssRuleWithTheme(({theme}) => ({
  height: pxToRem(IconSize.Small),
  fill: theme.colors.white,
  cursor: 'pointer'
}))

export interface FilterTagProps {
  readonly text: string
  onDismiss(): void
}

export function FilterTag({text, onDismiss}: FilterTagProps) {
  const {css} = useThemeStyle()

  return (
    <div className={css(FilterTagStyle)}>
      {text}
      <button className={css(IconButtonStyle)} onClick={onDismiss}>
        <Icon className={css(IconStyle)} type={IconType.Close} />
      </button>
    </div>
  )
}

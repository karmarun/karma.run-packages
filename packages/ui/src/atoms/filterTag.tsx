import React from 'react'
import {MaterialIconClose} from '@karma.run/icons'

import {Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {BaseButton} from './baseButton'
import {FontSize,  Spacing, TransitionDuration} from '../style/helpers'

const FilterTagStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.action,
  fontSize: FontSize.Small,
  minWidth: 100,
  height: 30,
  overflow: 'hidden',
  borderRadius: '2px',
  border: `1px solid ${theme.colors.actionDark}`,
  color: theme.colors.white,
  lineHeight: 30,
  paddingLeft: Spacing.Tiny
}))

const CloseButtonStyle = cssRuleWithTheme(({theme}) => ({
  fill: theme.colors.white,
  fontSize: FontSize.Medium,

  transitionProperty: 'fill',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Fast,

  width: 20,

  ':hover': {
    fill: theme.colors.actionDark
  }
}))

export interface FilterTagProps {
  readonly text: string
  onDismiss(): void
}

export function FilterTag({text, onDismiss}: FilterTagProps) {
  const css = useThemeStyle()

  return (
    <div className={css(FilterTagStyle)}>
      {text}
      <BaseButton onClick={onDismiss} style={CloseButtonStyle}>
        <Icon element={MaterialIconClose} />
      </BaseButton>
    </div>
  )
}

import React from 'react'
import {MaterialIconClose} from '@karma.run/icons'

import {Icon} from '../atoms/icon'
import {cssRuleWithTheme, useThemeStyle, themeMiddleware} from '../style/themeContext'
import {BaseButton} from '../atoms/baseButton'
import {
  FontSize,
  Spacing,
  TransitionDuration,
  BorderRadius,
  BorderWidth,
  LineHeight
} from '../style/helpers'
import {styled} from '@karma.run/react'
import {Image} from './image'

const FilterTagStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.dark,
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
  readonly label: string
  readonly imageURL?: string
  readonly onDelete?: () => void
}

export const ChipElement = styled(
  'div',
  ({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'fill',
    flexDirection: 'row',
    overflow: 'hidden',

    height: 20,

    fontSize: FontSize.Small,
    color: theme.colors.dark,

    borderRadius: BorderRadius.Tiny,
    borderWidth: BorderWidth.Small,
    borderStyle: 'solid',
    borderColor: theme.colors.grayLight,
    backgroundColor: theme.colors.light
  }),
  themeMiddleware
)

export const ChipImage = styled('img', () => ({
  width: 18,
  height: '100%',
  objectFit: 'cover',
  borderTopRightRadius: BorderRadius.Tiny,
  borderBottomRightRadius: BorderRadius.Tiny
}))

export const ChipLabel = styled('span', () => ({
  padding: `0 ${Spacing.ExtraSmall}`
}))

export function Chip({label, imageURL, onDelete}: FilterTagProps) {
  return (
    <ChipElement>
      {imageURL && <ChipImage src={imageURL} />}
      <ChipLabel>{label}</ChipLabel>
      {/* <BaseButton onClick={onDismiss} style={CloseButtonStyle}>
        <Icon element={MaterialIconClose} />
      </BaseButton> */}
    </ChipElement>
  )
}

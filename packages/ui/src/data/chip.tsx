import React from 'react'
import {styled} from '@karma.run/react'

import {IconElement} from './icon'
import {Image} from './image'
import {IconButton} from '../buttons/iconButton'

import {themeMiddleware} from '../style/themeContext'
import {FontSize, Spacing, BorderRadius, BorderWidth} from '../style/helpers'

export interface FilterTagProps {
  readonly label: string
  readonly imageURL?: string
  readonly icon?: IconElement
  readonly onIconClick?: () => void
}

export const ChipElement = styled(
  'div',
  ({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'fill',
    flexDirection: 'row',
    overflow: 'hidden',

    fontSize: FontSize.Small,
    color: theme.colors.dark,

    borderRadius: BorderRadius.Tiny,
    borderWidth: BorderWidth.Small,
    borderStyle: 'solid',
    borderColor: theme.colors.gray,
    backgroundColor: theme.colors.light
  }),
  themeMiddleware
)

export const ChipImage = styled('img', () => ({
  width: 26,
  alignSelf: 'stretch',
  objectFit: 'cover'
}))

export const ChipLabel = styled('span', () => ({
  padding: `${Spacing.Tiny} ${Spacing.ExtraSmall}`
}))

export function Chip({label, imageURL, icon, onIconClick}: FilterTagProps) {
  return (
    <ChipElement>
      {imageURL && <Image src={imageURL} width={26} alignSelf="stretch" />}
      <ChipLabel>{label}</ChipLabel>
      {icon && (
        <IconButton
          icon={icon}
          variant="light"
          marginLeft={-Spacing.Tiny}
          onClick={() => onIconClick?.()}
        />
      )}
    </ChipElement>
  )
}

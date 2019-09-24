import React from 'react'

import {Icon, IconType, IconScale} from '../atoms/icon'
import {pxToRem, pxToEm} from '../style/helpers'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {cssRule} from '@karma.run/react'

export interface ImageMetaProps {}

export const FocalPointStyle = cssRuleWithTheme(({theme}) => ({
  cursor: 'pointer',

  width: pxToRem(50),
  height: pxToRem(50),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },

  borderRadius: '100%',
  border: `1px solid ${theme.colors.white}`,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  fill: theme.colors.white,
  fontSize: IconScale.Double
}))

export interface FocalPointProps {}

export function FocalPoint({}: FocalPointProps) {
  const {css} = useThemeStyle()
  return (
    <div className={css(FocalPointStyle)}>
      <Icon type={IconType.Focus} />
    </div>
  )
}

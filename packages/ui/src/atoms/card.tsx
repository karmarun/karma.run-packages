import {ReactNode} from 'react'

import {cssRuleWithTheme, themeStyled} from '../style/themeContext'
import {pxToRem, Spacing} from '../style/helpers'

export interface CardProps {
  children?: ReactNode
}

export const Card = themeStyled(
  'div',
  cssRuleWithTheme(({theme}) => ({
    border: `solid 1px ${theme.colors.grayLight}`,
    borderRadius: pxToRem(8),
    backgroundColor: theme.colors.white,
    padding: pxToRem(Spacing.ExtraSmall),
    width: '100%'
  }))
)

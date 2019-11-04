import {styled} from '@karma.run/react'
import {pxToRem, Spacing} from '../style/helpers'

export const PanelSection = styled('div', () => ({
  _className: process.env.NODE_ENV !== 'production' ? 'PanelSection' : undefined,
  padding: pxToRem(Spacing.Small)
}))

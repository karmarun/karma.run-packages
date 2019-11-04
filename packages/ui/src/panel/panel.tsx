import {styled} from '@karma.run/react'
import {themeMiddleware} from '../style/themeContext'

export const Panel = styled(
  'div',
  ({theme}) => ({
    _className: process.env.NODE_ENV !== 'production' ? 'Panel' : undefined,

    display: 'flex',
    flexDirection: 'column',

    overflowX: 'hidden',
    overflowY: 'auto',

    width: '100%',
    height: 'inherit',

    backgroundColor: theme.colors.white
  }),
  themeMiddleware
)

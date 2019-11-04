import {styled} from '@karma.run/react'
import {BorderWidth, BorderRadius} from '../style/helpers'
import {themeMiddleware} from '../style/themeContext'

export const Image = styled(
  'img',
  ({theme}) => ({
    width: '100%',
    height: '100%',
    borderWidth: BorderWidth.Small,
    borderColor: theme.colors.grayLight,
    borderStyle: 'solid',
    borderRadius: BorderRadius.Small,
    backgroundColor: theme.colors.light,
    objectFit: 'cover'
  }),
  themeMiddleware
)

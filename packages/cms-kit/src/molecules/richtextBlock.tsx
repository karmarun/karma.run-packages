import React from 'react'
import {FieldProps} from '../fields/types'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'

export const RichtextBlockStyle = cssRuleWithTheme(({theme}) => ({
  width: '100%',
  border: 'none',
  '&::placeholder': {
    color: theme.colors.gray
  }
}))

export function RichtextBlock({value, onChange}: FieldProps) {
  const {css} = useThemeStyle()

  const placeholderLead =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore. Stet clita kasd gubergren, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore'

  return (
    <textarea
      placeholder={placeholderLead}
      className={css(RichtextBlockStyle)}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  )
}

import React from 'react'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {cssRule, useStyle} from '@karma.run/react'
import {pxToRem, FontSize} from '../style/helpers'
import {FieldProps} from '../fields/types'

export const HeaderBlockStyle = cssRuleWithTheme(({theme}) => ({
  '& > *': {
    display: 'block',
    textAlign: 'center',
    width: '100%',
    border: 'none',
    '&::placeholder': {
      color: theme.colors.gray
    }
  }
}))

const HeaderBlockTitleStyle = cssRule({
  fontSize: pxToRem(FontSize.ExtraLarge),
  fontWeight: 'bold'
})

const HeaderBlockLeadStyle = cssRule({
  fontSize: pxToRem(FontSize.Medium),
  minHeight: '60px'
})

export function HeaderBlock({value, onChange}: FieldProps<{title: string; lead: string}>) {
  const {css} = useThemeStyle()

  const placeholderLead =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam consetetur sadipscing elitr, sed diam nonumy eirmod'

  return (
    <div className={css(HeaderBlockStyle)}>
      <input
        placeholder={'Article title'}
        className={css(HeaderBlockTitleStyle)}
        value={value.title}
        onChange={e => onChange({title: e.currentTarget.value, lead: value.lead})}
      />
      <textarea
        placeholder={placeholderLead}
        className={css(HeaderBlockLeadStyle)}
        value={value.lead}
        onChange={e => onChange({title: value.title, lead: e.currentTarget.value})}
      />
    </div>
  )
}

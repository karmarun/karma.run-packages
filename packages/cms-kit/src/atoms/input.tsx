import React from 'react'
import {IconType, Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle, ThemeContext} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'

export const InputStyle = cssRuleWithTheme(({theme}) => ({
  // todo
}))

const LabelStyle = cssRuleWithTheme<{hasError: boolean}>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.action
}))

const DescriptionStyle = cssRuleWithTheme<{hasError: boolean}>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.action
}))

export interface InputProps {
  readonly label?: string
  readonly value: string
  readonly placeholder: string
  readonly description?: string
  readonly icon?: IconType
  readonly errorText?: string
  readonly className?: string
  onValueChange(value: string, event: React.ChangeEvent<HTMLInputElement>): void
}

export function Input({
  label,
  placeholder,
  value,
  description,
  icon,
  onValueChange,
  errorText,
  className
}: InputProps) {
  const hasError = errorText ? true : false
  const {css} = useThemeStyle({hasError: hasError})

  const Input = (
    <input
      placeholder={placeholder}
      value={value}
      onChange={event => {
        onValueChange(event.target.value, event)
      }}
    />
  )

  const Description = hasError ? errorText : description

  return (
    <div className={joinClassNames(css(InputStyle), className)}>
      <div className={css(LabelStyle)}>{label}</div>
      <div>
        {icon ? (
          <>
            <Icon type={icon} /> {Input}
          </>
        ) : (
          Input
        )}
      </div>
      <div className={css(DescriptionStyle)}>{Description}</div>
    </div>
  )
}

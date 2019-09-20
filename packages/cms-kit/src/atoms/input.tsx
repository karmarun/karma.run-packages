import React from 'react'
import {IconType, Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle, ThemeContext} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'
import {pxToRem, FontSize, TransitionDuration} from '../style/helpers'

export interface InputStyleProps {
  hasError: boolean
}

export const InputFieldStyle = cssRuleWithTheme(({theme}) => ({}))

export const InputStyle = cssRuleWithTheme(({theme}) => ({
  position: 'relative',
  marginTop: '1.6rem',

  '& input': {
    width: '100%',
    border: 'none',
    borderBottom: `1px solid ${theme.colors.gray}`,
    transition: `border-color ease-in ${TransitionDuration.Slow}`,

    fontSize: pxToRem(FontSize.Medium),

    '::placeholder': {
      color: theme.colors.gray
    },

    ':focus': {
      outline: 'none',
      borderColor: theme.colors.action
    },

    ':placeholder-shown + label': {
      opacity: '0',
      transform: 'translateY(30%)'
    }
  }
}))

const LabelStyle = cssRuleWithTheme<InputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.action,
  position: 'absolute',
  top: '-1.6rem',
  left: '0',
  fontSize: pxToRem(FontSize.Small),
  opacity: '1',
  transform: 'translateY(0%)',
  transition: 'transform ease-in-out, opacity ease-in-out, color ease-in-out',
  transitionDuration: TransitionDuration.Fast
}))

const DescriptionStyle = cssRuleWithTheme<InputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.action
}))

export interface InputProps {
  readonly label?: string
  readonly value: string
  readonly placeholder: string
  readonly description: string
  readonly errorDescription?: string
  readonly icon?: IconType
  readonly className?: string
  onValueChange(value: string, event: React.ChangeEvent<HTMLInputElement>): void
}

export function Input({
  label,
  placeholder,
  value,
  description,
  errorDescription,
  icon,
  onValueChange,
  className
}: InputProps) {
  const {css} = useThemeStyle<InputStyleProps>({hasError: errorDescription != null})

  const Input = (
    <input
      placeholder={placeholder}
      value={value}
      onChange={event => {
        onValueChange(event.target.value, event)
      }}
    />
  )

  return (
    <div className={joinClassNames(css(InputFieldStyle), className)}>
      <div className={joinClassNames(css(InputStyle))}>
        {icon ? (
          <>
            <Icon type={icon} /> {Input}
          </>
        ) : (
          Input
        )}
        <label className={css(LabelStyle)}>{label}</label>
      </div>

      <div className={css(DescriptionStyle)}>{errorDescription && description}</div>
    </div>
  )
}

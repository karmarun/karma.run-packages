import React from 'react'

import {IconType, Icon, IconScale} from './icon'
import {BaseInput, InputType} from './baseInput'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration, Spacing} from '../style/helpers'

interface TextInputStyleProps {
  hasError: boolean
}

const TextInputContainerStyle = cssRuleWithTheme(() => ({
  minHeight: pxToRem(54),
  paddingTop: pxToRem(16)
}))

const TextInputStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
  position: 'relative',

  '> input': {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid',
    borderColor: hasError ? theme.colors.alert : theme.colors.gray,
    transition: `border-color ease-in ${TransitionDuration.Slow}`,

    fontSize: pxToRem(FontSize.Medium),

    '::placeholder': {
      color: theme.colors.gray
    },

    ':focus': {
      outline: 'none',
      borderColor: theme.colors.action
    },

    ':required:focus:valid': {
      borderColor: theme.colors.success
    },

    ':required:focus:valid + label': {
      color: theme.colors.success
    },

    ':required:focus:invalid': {
      borderColor: theme.colors.alert
    },

    ':required:focus:invalid + label': {
      color: theme.colors.alert
    },

    ':required:invalid': {
      borderColor: theme.colors.alert
    },

    ':required:invalid + label': {
      color: theme.colors.alert
    },

    ':placeholder-shown + label': {
      opacity: 0,
      transform: 'translateY(30%)'
    },

    ':focus + label': {
      color: theme.colors.action
    }
  },
  '> span': {
    position: 'absolute',
    left: '1px',
    top: '1px',
    fill: theme.colors.dark
  },
  '> span + input': {
    paddingLeft: pxToRem(Spacing.Medium)
  }
}))

const LabelStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.gray,
  position: 'absolute',
  top: '-1.6rem',
  left: 0,
  fontSize: pxToRem(FontSize.Small),
  opacity: 1,
  transform: 'translateY(0%)',
  transition: 'transform ease-in-out, opacity ease-in-out, color ease-in-out',
  transitionDuration: TransitionDuration.Fast
}))

const DescriptionStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
  color: hasError ? theme.colors.alert : theme.colors.gray,
  fontSize: pxToRem(FontSize.Small)
}))

export interface TextInputProps {
  readonly label?: string
  readonly value: string
  readonly description?: string
  readonly errorDescription?: string
  readonly icon?: IconType
  readonly disabled?: boolean

  onChange(value: string, event: React.ChangeEvent<HTMLInputElement>): void
}

export function TextInput({
  label,
  value,
  description,
  errorDescription,
  icon,
  onChange,
  disabled
}: TextInputProps) {
  const {css} = useThemeStyle<TextInputStyleProps>({hasError: errorDescription != null})

  const Input = (
    <BaseInput
      type={InputType.Text}
      placeholder={label}
      value={value}
      onChange={(value, event) => {
        onChange(value, event)
      }}
      disabled={disabled}
    />
  )

  return (
    <div className={css(TextInputContainerStyle)}>
      <div className={css(TextInputStyle)}>
        {icon ? (
          <>
            <Icon type={icon} scale={IconScale.Larger} />
            {Input}
          </>
        ) : (
          Input
        )}
        <label className={css(LabelStyle)}>{label}</label>
      </div>

      <div className={css(DescriptionStyle)}>{errorDescription || description}</div>
    </div>
  )
}

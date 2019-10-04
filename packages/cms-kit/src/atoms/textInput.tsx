import React, {ChangeEvent} from 'react'

import {IconType, Icon} from './icon'
import {BaseInput, InputType} from './baseInput'

import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {pxToRem, FontSize, TransitionDuration, Spacing} from '../style/helpers'
import {cssRule} from '@karma.run/react'

interface TextInputStyleProps {
  hasError: boolean
}

const TextInputContainerStyle = cssRuleWithTheme(() => ({
  minHeight: pxToRem(54),
  paddingTop: pxToRem(16)
}))

const TextInputWrapperStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',

  fontSize: pxToRem(FontSize.Medium),
  fill: theme.colors.dark
}))

const IconStyle = cssRule(() => ({
  position: 'absolute',
  marginRight: pxToRem(Spacing.Tiny)
}))

const TextInputStyle = cssRuleWithTheme<TextInputStyleProps>(({hasError, theme}) => ({
  width: '100%',

  borderBottom: `1px solid ${theme.colors.gray}`,
  transitionProperty: 'border-color',
  transitionTimingFunction: 'ease-in',
  transitionDuration: TransitionDuration.Slow,
  // If Inupt has Icon add padding:
  //paddingLeft: pxToRem(20),

  '::placeholder': {
    color: theme.colors.gray
  },

  ':focus': {
    outline: 'none',
    borderColor: theme.colors.action
  },

  ':focus:valid': {
    borderColor: theme.colors.action
  },

  ':focus:valid + label': {
    color: theme.colors.action
  },

  ':focus:invalid': {
    borderColor: theme.colors.alert
  },

  ':focus:invalid + label': {
    color: theme.colors.alert
  },

  ':invalid': {
    borderColor: theme.colors.alert
  },

  ':invalid + label': {
    color: theme.colors.alert
  },

  ':placeholder-shown + label': {
    opacity: 0,
    transform: 'translateY(30%)'
  },

  ':focus + label': {
    color: theme.colors.action
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
  transitionProperty: 'transform, opacity, color',
  transitionTimingFunction: 'ease-in-out',
  transitionDuration: TransitionDuration.Slow
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

  onChange(event: ChangeEvent<HTMLInputElement>): void
}

export function TextInput({label, description, errorDescription, icon, ...props}: TextInputProps) {
  const styleProps = {hasError: errorDescription != null}
  const {css} = useThemeStyle<TextInputStyleProps>(styleProps)

  return (
    <div className={css(TextInputContainerStyle)}>
      <div className={css(TextInputWrapperStyle)}>
        {icon && <Icon type={icon} style={IconStyle} />}
        <BaseInput
          type={InputType.Email}
          placeholder={label}
          style={TextInputStyle}
          styleProps={styleProps}
          {...props}
        />
        <label className={css(LabelStyle)}>{label}</label>
      </div>
      <div className={css(DescriptionStyle)}>{errorDescription || description}</div>
    </div>
  )
}

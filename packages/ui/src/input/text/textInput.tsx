import React, {ChangeEvent, InputHTMLAttributes, forwardRef} from 'react'

import {IconType, Icon} from '../../atoms/icon'

import {themeMiddleware, Theme} from '../../style/themeContext'
import {
  FontSize,
  TransitionDuration,
  LineHeight,
  Spacing,
  MarginProps,
  extractStyleProps
} from '../../style/helpers'
import {cssRule, styled} from '@karma.run/react'

interface TextInputStyleProps {
  readonly hasError: boolean
  readonly hasIcon: boolean
  readonly theme: Theme
}

const IconStyle = cssRule(() => ({
  position: 'absolute'
}))

const TextInputWrapper = styled('div', (props: MarginProps) => ({
  paddingTop: 16,
  ...props
}))

const TextInputLabelWrapper = styled(
  'label',
  ({theme}) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    fontSize: FontSize.Medium,
    fill: theme.colors.dark
  }),
  themeMiddleware
)

const TextInputLabel = styled(
  'span',
  ({hasError, theme}: TextInputStyleProps) => ({
    color: hasError ? theme.colors.alert : theme.colors.gray,
    position: 'absolute',
    top: -FontSize.Medium,
    left: 0,
    fontSize: FontSize.Small,
    opacity: 1,
    transform: 'translateY(0%)',
    transitionProperty: 'transform, opacity, color',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: TransitionDuration.Slow
  }),
  themeMiddleware
)

const TextInputElement = styled(
  'input',
  ({hasIcon, theme}: TextInputStyleProps) => ({
    width: '100%',

    fontSize: 'inherit',
    lineHeight: LineHeight.Default,

    border: 'none',
    borderBottom: `1px solid ${theme.colors.gray}`,

    transitionProperty: 'border-color',
    transitionTimingFunction: 'ease-in',
    transitionDuration: TransitionDuration.Slow,

    paddingLeft: hasIcon ? FontSize.Medium + Spacing.Tiny : undefined,

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

    ':focus:valid + span': {
      color: theme.colors.action
    },

    ':focus:invalid': {
      borderColor: theme.colors.alert
    },

    ':focus:invalid + span': {
      color: theme.colors.alert
    },

    ':invalid': {
      borderColor: theme.colors.alert
    },

    ':disabled': {
      opacity: 0.5
    },

    ':invalid + span': {
      color: theme.colors.alert
    },

    ':placeholder-shown + span': {
      opacity: 0,
      transform: 'translateY(30%)'
    },

    ':focus + span': {
      color: theme.colors.action
    }
  }),
  themeMiddleware
)

const TextInputInfo = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.gray,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

const TextInputError = styled(
  'div',
  ({theme}) => ({
    color: theme.colors.alert,
    fontSize: FontSize.Small,
    marginTop: Spacing.Tiny
  }),
  themeMiddleware
)

export interface TextInputProps extends MarginProps, InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string
  readonly value: string
  readonly description?: string
  readonly errorMessage?: string
  readonly icon?: IconType
  readonly disabled?: boolean

  onChange(event: ChangeEvent<HTMLInputElement>): void
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {label, description, errorMessage, icon, ...props},
  ref
) {
  const styleProps = {hasError: errorMessage != undefined, hasIcon: icon != undefined}
  const [marginProps, elementProps] = extractStyleProps(props)

  return (
    <TextInputWrapper styleProps={marginProps}>
      <TextInputLabelWrapper>
        {icon && <Icon element={icon} style={IconStyle} />}
        <TextInputElement ref={ref} placeholder={label} styleProps={styleProps} {...elementProps} />
        <TextInputLabel styleProps={styleProps}>{label}</TextInputLabel>
      </TextInputLabelWrapper>
      {description && <TextInputInfo>{description}</TextInputInfo>}
      {errorMessage && <TextInputError>{errorMessage}</TextInputError>}
    </TextInputWrapper>
  )
})

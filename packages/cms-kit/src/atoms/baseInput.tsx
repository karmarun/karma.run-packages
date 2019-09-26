import React from 'react'

import {toArray} from '../utility'
import {CSSRuleWithTheme, useThemeStyle} from '../style/themeContext'

export enum InputType {
  Text = 'text',
  Checkbox = 'checkbox',
  Radio = 'radio'
}

export type ValueTypeForInputType<T extends InputType> = T extends InputType.Text
  ? string
  : T extends InputType.Checkbox | InputType.Radio
  ? boolean
  : never

export interface InputProps<T extends InputType> {
  readonly id?: string

  readonly type: T
  readonly value: ValueTypeForInputType<T>
  readonly placeholder?: string
  readonly disabled?: boolean

  onChange(value: ValueTypeForInputType<T>, event: React.ChangeEvent<HTMLInputElement>): void
}

export interface BaseInputProps<T extends InputType, P = undefined> extends InputProps<T> {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps?: P
}

export interface BaseInputPropsWithoutStyleProps<T extends InputType> extends InputProps<T> {
  readonly style?: CSSRuleWithTheme | CSSRuleWithTheme[]
}

export interface BaseInputPropsPropsWithStyleProps<T extends InputType, P = undefined>
  extends InputProps<T> {
  readonly style?: CSSRuleWithTheme<P> | CSSRuleWithTheme<P>[]
  readonly styleProps: P
}

export function BaseInput<T extends InputType>(
  props: BaseInputPropsWithoutStyleProps<T>
): JSX.Element
export function BaseInput<T extends InputType, P = undefined>(
  props: BaseInputPropsPropsWithStyleProps<T, P>
): JSX.Element
export function BaseInput<T extends InputType, P = undefined>({
  type,
  style,
  styleProps,
  value,
  onChange,
  ...props
}: BaseInputProps<T, P>): JSX.Element {
  const {css} = useThemeStyle(styleProps)

  const attributeKey = valueAttributeKeyForInputType(type)
  const valueProp = {[attributeKey]: value}

  return (
    <input
      {...props}
      {...valueProp}
      type={type}
      onChange={event =>
        onChange(event.currentTarget[attributeKey] as ValueTypeForInputType<T>, event)
      }
      className={css(...toArray(style))}
    />
  )
}

export function valueAttributeKeyForInputType(inputType: InputType) {
  switch (inputType) {
    case InputType.Text:
      return 'value'

    case InputType.Radio:
    case InputType.Checkbox:
      return 'checked'
  }
}

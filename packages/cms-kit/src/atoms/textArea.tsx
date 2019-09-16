import React from 'react'
import {IconType, Icon} from './icon'
import {cssRuleWithTheme, useThemeStyle} from '../style/themeContext'
import {joinClassNames} from '@karma.run/react'

export const TextAreaStyle = cssRuleWithTheme(({theme}) => ({
  // todo
}))

const LabelStyle = cssRuleWithTheme<{hasError: boolean}>(({hasError, theme}) => ({
  color: theme.colors.action
}))

const DescriptionStyle = cssRuleWithTheme<{hasError: boolean}>(({hasError, theme}) => ({
  color: theme.colors.action
}))

export interface TextAreaProps {
  readonly label?: string
  readonly value: string
  readonly placeholder: string
  readonly description?: string
  readonly className?: string
  onValueChange(value: string, event: React.ChangeEvent<HTMLTextAreaElement>): void
}

export function TextArea({
  label,
  value,
  placeholder,
  description,
  onValueChange,
  className
}: TextAreaProps) {
  const {css} = useThemeStyle()

  return (
    <div className={joinClassNames(css(TextAreaStyle), className)}>
      <div className={css(LabelStyle)}>{label}</div>
      <div>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={event => {
            onValueChange(event.target.value, event)
          }}
        />
      </div>
      <div className={css(DescriptionStyle)}>{description}</div>
    </div>
  )
}

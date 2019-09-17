import React, {ReactNode} from 'react'
import {useThemeStyle, cssRuleWithTheme} from '../style/themeContext'
import {OptionButton} from './optionButton'
import {IconType} from './icon'

export const PlaceholderStyle = cssRuleWithTheme(({theme}) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  backgroundColor: theme.colors.light,
  width: '100%'
}))

export interface PlaceholderProps {
  readonly children?: ReactNode
  onAdd(): void
}

export function Placeholder({children, onAdd}: PlaceholderProps) {
  const {css} = useThemeStyle()

  if (children) {
    return <>{children}</>
  }

  return (
    <div className={css(PlaceholderStyle)}>
      <OptionButton icon={IconType.Add} onClick={() => onAdd()} />
    </div>
  )
}

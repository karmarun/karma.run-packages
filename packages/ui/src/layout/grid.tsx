import React, {ReactNode, Children, createContext, useContext} from 'react'
import {useStyle, cssRule} from '@karma.run/react'
import {Spacing} from '../style/helpers'

interface GridStyleProps {
  readonly spacing: Spacing
}

const GridStyle = cssRule<GridStyleProps>(({spacing}) => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: -spacing / 2
}))

export interface GridProps {
  readonly children?: ReactNode
  readonly spacing?: Spacing
}

export function Grid({children, spacing = Spacing.Tiny}: GridProps) {
  const css = useStyle<GridStyleProps>({spacing})

  return (
    <GridContext.Provider value={{spacing}}>
      <div className={css(GridStyle)}>{children}</div>
    </GridContext.Provider>
  )
}

interface ColumnStyleProps {
  readonly flexBasis: string
  readonly spacing: Spacing
}

const ColumnStyle = cssRule<ColumnStyleProps>(({flexBasis, spacing}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'Column' : undefined,

  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  flexBasis
}))

const ColumnItemStyle = cssRule<ColumnStyleProps>(({spacing}) => ({
  _className: process.env.NODE_ENV !== 'production' ? 'ColumnItem' : undefined,

  padding: spacing / 2
}))

export interface GridColumnProp {
  readonly ratio?: number
  readonly children?: ReactNode
}

export function Column({ratio, children}: GridColumnProp) {
  const {spacing} = useContext(GridContext)
  const css = useStyle<ColumnStyleProps>({
    flexBasis: ratio ? `${ratio * 100}%` : '100%',
    spacing
  })

  return (
    <div className={css(ColumnStyle)}>
      {Children.map(children, child => (
        <div className={css(ColumnItemStyle)}>{child}</div>
      ))}
    </div>
  )
}

export interface GridContextState {
  readonly spacing: Spacing
}

export const GridContext = createContext<GridContextState>({spacing: Spacing.None})

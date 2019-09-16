import React, {ReactNode} from 'react'
import {useStyle, cssRule} from '@karma.run/react'
import {RenderFunction} from '@storybook/react'

import {pxToRem} from '../style/helpers'

export interface CenterLayoutStyleProps {
  scale: number
}

export const CenterLayoutStyle = cssRule({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  minWidth: '100vw',
  minHeight: '100vh'
})

export const CenterLayoutContentStyle = cssRule(({scale}: CenterLayoutStyleProps) => ({
  padding: pxToRem(20),
  margin: pxToRem(20),
  minWidth: `${scale * 100}%`,
  border: '1px dashed rgba(0,0,0, 0.05)'
}))

export interface CenterLayoutProps {
  minWidthFactor: number
  children?: ReactNode
}

export function CenterLayout({minWidthFactor: scale, children}: CenterLayoutProps) {
  const {css} = useStyle({scale})

  return (
    <div className={css(CenterLayoutStyle)}>
      <div className={css(CenterLayoutContentStyle)}>{children}</div>
    </div>
  )
}

export function centerLayoutDecorator(minWidthFactor: number = 0) {
  return (story: RenderFunction) => {
    return <CenterLayout minWidthFactor={minWidthFactor}>{story()}</CenterLayout>
  }
}

export interface FontSizeStyleProps {
  fontSize: number
}

export const FontSizeStyle = cssRule(({fontSize}: FontSizeStyleProps) => ({
  fontSize: pxToRem(fontSize)
}))

export interface FontSizeProps {
  fontSize: number
  children?: ReactNode
}

export function FontSize({fontSize, children}: FontSizeProps) {
  const {css} = useStyle({fontSize})

  return <div className={css(FontSizeStyle)}>{children}</div>
}

export function fontSizeDecorator(fontSize: number = 24) {
  return (story: RenderFunction) => {
    return <FontSize fontSize={fontSize}>{story()}</FontSize>
  }
}

export const InfoBoxStyle = cssRule(() => ({
  backgroundColor: '#f7fcff',
  display: 'inline-block',
  margin: pxToRem(10),
  textAlign: 'center',
  minWidth: pxToRem(80),
  paddingTop: pxToRem(20),
  paddingBottom: pxToRem(5)
}))

export const InfoBoxTextStyle = cssRule(() => ({
  paddingBottom: pxToRem(5),
  paddingTop: pxToRem(5)
}))

export const InfoBoxContentStyle = cssRule((elementSize: number) => ({
  width: pxToRem(elementSize),
  display: 'inline-block'
}))

export interface InfoBoxProps {
  infoText: string
  children: ReactNode
  fontSize?: number
  elementSize?: number
}

export function InfoBox({fontSize = 12, elementSize = 24, infoText, children}: InfoBoxProps) {
  const {css} = useStyle(elementSize)

  return (
    <div className={css(InfoBoxStyle)}>
      <div className={css(InfoBoxContentStyle)}>{children}</div>
      <div className={css(InfoBoxTextStyle)}>
        <FontSize fontSize={fontSize}>{infoText}</FontSize>
      </div>
    </div>
  )
}

export function infoBoxDecorator(infoText: string, fontSize: number = 12) {
  return (story: RenderFunction) => {
    return (
      <InfoBox infoText={infoText} fontSize={fontSize}>
        {story()}
      </InfoBox>
    )
  }
}

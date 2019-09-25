import React, {ReactNode} from 'react'
import {NavigationTemplate, IconType} from '@karma.run/cms-kit'
import {LinkMenuIconButton, LogoutRoute, ArticleListRoute} from './route'

export interface BaseProps {
  readonly children?: ReactNode
}

export function Base({children}: BaseProps) {
  return (
    <NavigationTemplate
      navigationChildren={isCollapsed => (
        <>
          <LinkMenuIconButton
            icon={IconType.Article}
            label="Article"
            hideLabel={isCollapsed}
            route={ArticleListRoute.create({})}
          />

          <LinkMenuIconButton
            icon={IconType.Logout}
            label="Logout"
            hideLabel={isCollapsed}
            route={LogoutRoute.create({})}
          />
        </>
      )}>
      {children}
    </NavigationTemplate>
  )
}

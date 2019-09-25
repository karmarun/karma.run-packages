import React from 'react'

import {NavigationTemplate} from './navigationTemplate'
import {MenuIconButton} from '../atoms/menuIconButton'
import {IconType} from '../atoms/icon'

export default {
  component: NavigationTemplate,
  title: 'Templates|NavigationTemplate'
}

export const Standard = () => (
  <NavigationTemplate
    navigationChildren={isCollapsed => (
      <>
        <MenuIconButton icon={IconType.Article} label={'Article'} hideLabel={isCollapsed} />
        <MenuIconButton icon={IconType.Page} label={'Pages'} hideLabel={isCollapsed} />
        <MenuIconButton
          icon={IconType.MediaLibrary}
          label={'Media Library'}
          hideLabel={isCollapsed}
        />
        <MenuIconButton
          icon={IconType.Proofreading}
          label={'Proofreading'}
          hideLabel={isCollapsed}
        />
        <MenuIconButton icon={IconType.Menu} label={'Menu'} hideLabel={isCollapsed} />
        <MenuIconButton icon={IconType.Logout} label={'Logout'} hideLabel={isCollapsed} />
      </>
    )}>
    <div style={{height: '2000px', backgroundImage: 'linear-gradient(#FFF, #000)'}} />
  </NavigationTemplate>
)

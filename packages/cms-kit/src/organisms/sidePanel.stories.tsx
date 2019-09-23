import React from 'react'
import {centerLayoutDecorator} from '../.storybook/decorators'
import {SidePanel} from './sidePanel'
import {useState} from '@storybook/addons'
import {OptionButton} from '../atoms/optionButton'
import {IconType} from '../atoms/icon'

export default {
  component: SidePanel,
  title: 'Organisms|SidePanel',
  decorators: [centerLayoutDecorator()]
}

export const ShowCase = () => {
  const [showSidePanel, setShowSidePanel] = useState(true)

  return (
    <>
      {!showSidePanel && (
        <OptionButton icon={IconType.Add} onClick={() => setShowSidePanel(true)} />
      )}
      {showSidePanel && (
        <SidePanel title={'Title'} onClose={() => setShowSidePanel(false)}>
          test
        </SidePanel>
      )}
    </>
  )
}

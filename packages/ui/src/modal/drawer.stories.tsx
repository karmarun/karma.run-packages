import React, {useState} from 'react'

import {PrimaryButton} from '../atoms/primaryButton'
import {Drawer} from './drawer'
import {Box} from '../layout/box'
import {SidePanel} from '../organisms/sidePanel'

export default {
  component: Drawer,
  title: 'Modal|Drawer'
}

export const Interactive = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <PrimaryButton label={'Label'} onClick={() => setOpen(true)} />
      <div style={{height: '2000px'}} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        {() => <SidePanel title="??" onClose={() => setOpen(false)}></SidePanel>}
      </Drawer>
    </>
  )
}

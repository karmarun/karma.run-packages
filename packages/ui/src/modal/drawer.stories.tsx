import React, {useState} from 'react'

import {PrimaryButton} from '../atoms/primaryButton'
import {Drawer} from './drawer'
import {Default} from '../panel/panel.stories'

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
      <Drawer open={open} onClose={() => setOpen(false)} width={480}>
        {() => <Default />}
      </Drawer>
    </>
  )
}

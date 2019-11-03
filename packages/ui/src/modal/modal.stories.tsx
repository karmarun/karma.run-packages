import React, {useState} from 'react'

import {PrimaryButton} from '../atoms/primaryButton'
import {Modal} from './modal'

export default {
  component: Modal,
  title: 'Modal|Modal'
}

export const Interactive = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <PrimaryButton label={'Open'} onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)}>
        {() => <PrimaryButton label={'Close'} onClick={() => setOpen(false)} />}
      </Modal>
    </>
  )
}

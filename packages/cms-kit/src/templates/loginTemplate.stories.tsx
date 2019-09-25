import React from 'react'
import {LoginTemplate} from './loginTemplate'
import {Input} from '../atoms/input'
import {PrimaryButton} from '../atoms/primaryButton'

export default {
  component: LoginTemplate,
  title: 'Templates|LoginTemplate'
}

export const Standard = () => {
  return (
    <LoginTemplate>
      <Input label="Username" value={''} onValueChange={() => {}} />
      <Input label="Password" value={''} onValueChange={() => {}} />
      <PrimaryButton label="Login" />
    </LoginTemplate>
  )
}

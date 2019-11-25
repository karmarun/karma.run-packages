import React, {useState} from 'react'

import {LoginTemplate} from './loginTemplate'

import {TextInput} from '../input/text/textInput'
import {Button} from '../input/buttons/button'
import {Box} from '../layout/box'
import {Spacing} from '../style/helpers'
import {InputType} from '../atoms/baseInput'

export default {
  component: LoginTemplate,
  title: 'Templates|LoginTemplate'
}

export const Standard = () => {
  const [username, setUsename] = useState()
  const [password, setPassword] = useState()

  return (
    <LoginTemplate>
      <Box marginBottom={Spacing.Small}>
        <TextInput label="Username" value={username} onChange={e => setUsename(e.target.value)} />
      </Box>
      <Box marginBottom={Spacing.Large}>
        <TextInput
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          password
        />
      </Box>
      <Button label="Login" color="primary" />
    </LoginTemplate>
  )
}

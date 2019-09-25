import React, {useState, useContext} from 'react'
import {LoginTemplate, Input, PrimaryButton} from '@karma.run/cms-kit'
import {useRouteDispatch, matchRoute, useRoute, IndexRoute} from './route'
import {RouteActionType} from '@karma.run/react'
import {AuthDispatchContext, AuthDispatchActionType} from './authContext'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const {current} = useRoute()

  const authDispatch = useContext(AuthDispatchContext)
  const routeDispatch = useRouteDispatch()

  function login() {
    setLoading(true)

    setTimeout(() => {
      authDispatch({type: AuthDispatchActionType.Login, username, token: '123'})

      if (current!.query && current!.query.next) {
        const route = matchRoute(location.origin + current!.query.next)

        if (route) {
          routeDispatch({type: RouteActionType.ReplaceRoute, route})
          return
        }
      }

      routeDispatch({type: RouteActionType.ReplaceRoute, route: IndexRoute.create({})})
    }, 1000)
  }

  return (
    <LoginTemplate>
      <Input label="Username" value={username} onValueChange={value => setUsername(value)} />
      <Input label="Password" value={password} onValueChange={value => setPassword(value)} />
      <PrimaryButton label="Login" onClick={login} disabled={loading} />
    </LoginTemplate>
  )
}

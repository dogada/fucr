import { StoreonModule } from 'storeon'
import { api } from '~/config'
import { dispatchError, dispatchPromise } from '.'
import { Events, State } from '.'

const UnauthorizedStatus = 401

export const me: StoreonModule<State, Events> = (store) => {
  store.on('@init', () => ({ me: undefined }))
  store.on('me/set', (state, user) => {
    return { me: user }
  })

  store.on('me/init', async () => {
    try {
      const user = await api.getMe()
      store.dispatch('me/set', user)
    } catch (e) {
      if (e.status !== UnauthorizedStatus) {
        return dispatchError(e)
      }
    }
  })

  store.on('me/login', () => dispatchPromise(api.getMe(), 'me/set'))
}

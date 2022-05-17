import {IToastParams} from './interface'
import {setToast} from './toast'

export const redirectTo = (path: string, opts?: { toast: IToastParams }): void => {
  if (opts?.toast) {
    const {message, type} = opts?.toast
    setToast({message, type})
  }

  window.location.href = path
}

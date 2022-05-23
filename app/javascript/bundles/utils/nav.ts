import {IToastParams} from './interface'
import {setToast} from './toast'
import {ROOT_PATH} from '../constants/routes'

export const redirectTo = (path: string, opts?: { toast: IToastParams }): void => {
  if (opts?.toast) {
    const {message, type} = opts?.toast
    setToast({message, type})
  }

  window.location.href = path
}

export const toHomePage = () => window.location.href = ROOT_PATH

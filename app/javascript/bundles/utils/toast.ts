import {IToastParams} from './interface'

export const TOAST = {
  MESSAGE: 'MESSAGE',
  TYPE: 'TYPE',
}

export const setToast = ({message, type}: IToastParams): void => {
  sessionStorage.setItem(TOAST.MESSAGE, message)
  sessionStorage.setItem(TOAST.TYPE, type)
}

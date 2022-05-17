// TODO use IRedirectParams
interface IRedirectParams {
  path: string
  opts?: {
    toast: IToastParams
  }
}

interface IToastParams {
  message: string
  type: 'success' | 'error'
}

export {IRedirectParams, IToastParams}

import React from 'react'
import {Toaster} from 'react-hot-toast'

const defaultProps = {
  className: null,
  children: null
}

interface IToaster {
  className: string
  children: any
}

const ToastWrapper = ({className, children}: IToaster) => {
  return (
    <div className={className}>
      <Toaster/>
      {children}
    </div>
  )
}

ToastWrapper.defaultProps = defaultProps

export default ToastWrapper


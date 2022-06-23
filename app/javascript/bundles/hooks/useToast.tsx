import React, {useEffect} from 'react'
import {toast} from 'react-hot-toast'
import {TOAST} from '../utils/toast'

const useToast = () => {
  useEffect(() => {
    if (TOAST.MESSAGE in sessionStorage) {
      toast.success(sessionStorage.getItem(TOAST.MESSAGE))
      sessionStorage.removeItem(TOAST.MESSAGE)
      sessionStorage.removeItem(TOAST.TYPE)
    }
  }, [window.location.href])
}

export default useToast

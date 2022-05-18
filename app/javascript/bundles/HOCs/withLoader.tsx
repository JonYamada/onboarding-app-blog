import React, {FC, useState} from 'react'
import {IWithLoaderProps} from '../views/articles/interfaces'

const withLoader = (WrappedComponent: FC<IWithLoaderProps>) => {
  return () => {
    const [loading, setLoading] = useState<boolean>(false)

    const toggleLoading = (flag?: boolean) => setLoading(typeof flag === 'boolean' ? flag : !loading)

    return <WrappedComponent loading={loading} toggleLoading={toggleLoading}/>
  }
}

export default withLoader

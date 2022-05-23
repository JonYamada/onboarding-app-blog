import {ReactNode} from 'react'
import {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar/AppBar'

interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface ISideNavProps {
  children: ReactNode
}

export {IAppBarProps, ISideNavProps}

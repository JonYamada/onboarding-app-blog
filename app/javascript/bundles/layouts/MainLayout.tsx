import React from 'react'
import SideNav from '../components/nav/SideNav'
import {Box, ThemeProvider, Toolbar} from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import {IMainLayoutProps} from './interfaces'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import {IAppBarProps} from '../components/nav/interfaces'
import {theme} from '../config/theme/theme'
import '../assets/stylesheets/forms.scss'

const defaultProps = {
  className: null
}

const drawerWidth = 200

const MainLayout = ({className, children}: IMainLayoutProps) => {
  const AppBar = styled(MuiAppBar)<IAppBarProps>(({theme}) => ({
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: theme.zIndex.drawer + 1,
  }))

  return (
    <ThemeProvider theme={theme}>
      <Box className={className}>
        <AppBar position='fixed' open>
          <Toolbar>
            <Typography variant='h6' noWrap component='div'>
              items n such
            </Typography>
          </Toolbar>
        </AppBar>
        <SideNav width={drawerWidth}>
          {children}
        </SideNav>
      </Box>
    </ThemeProvider>
  )
}

MainLayout.defaultProps = defaultProps

export default MainLayout

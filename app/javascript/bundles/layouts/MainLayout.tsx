import React, {useEffect} from 'react'
import '../assets/stylesheets/forms.scss'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import MuiAppBar from '@mui/material/AppBar'
import SideNav from '../components/nav/SideNav'
import {Avatar, Box, IconButton, Menu, MenuItem, ThemeProvider, Toolbar} from '@mui/material'
import {IAppBarProps} from '../components/nav/interfaces'
import {IMainLayoutProps} from './interfaces'
import {styled} from '@mui/material/styles'
import {theme} from '../config/theme/theme'

const defaultProps = {
  className: null
}

const AVATAR_MENU = 'avatar-menu'
const drawerWidth = 200

const MainLayout = ({className, children}: IMainLayoutProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = !!anchorEl

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const AppBar = styled(MuiAppBar)<IAppBarProps>(({theme}) => ({
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: theme.zIndex.drawer + 1,
  }))

  const renderTopNavItems = () => {
    // TODO add authorisation check field
    // TODO fix menu dropdown UI issue
    const items = [
      {
        key: 'profile',
        content: (
          <Box sx={{marginLeft: 'auto'}} key='profile'>
            <IconButton
              aria-controls={open ? AVATAR_MENU : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleClick}
              size='small'
              sx={{ml: 2}}
            >
              <Avatar alt='user avatar' src='https://picsum.photos/200/300?random=1'>
                {/*TODO add user initials*/}
                JY
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id={AVATAR_MENU}
              onClick={handleClose}
              onClose={handleClose}
              open={open}
            >
              <MenuItem>
                {/*TODO handle logout*/}
                <ListItemIcon>
                  <Logout fontSize='small'/>
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ),
      }
    ]

    return items.map(({content}) => content)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className={className}>
        <AppBar position='fixed' open>
          <Toolbar>
            {renderTopNavItems()}
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

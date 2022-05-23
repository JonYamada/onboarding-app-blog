import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiAppBar from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import SettingsIcon from '@mui/icons-material/Settings'
import {ARTICLES_PATH, SETTINGS_PATH} from '../../constants/routes'
import {CSSObject, styled, Theme} from '@mui/material/styles'
import {IAppBarProps, ISideNavProps} from './interfaces'
import {LOGO} from '../../constants/images'
import {redirectTo, toHomePage} from '../../utils/nav'
import {CssBaseline} from '@mui/material'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Logo = styled('img')(({onClick}) => ({
  cursor: onClick ? 'pointer' : 'default',
  width: 36,
}))

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
)

const navItems = [
  {
    name: 'Articles',
    url: ARTICLES_PATH,
    icon: <FeedOutlinedIcon/>,
  },
  {
    name: 'Settings',
    url: SETTINGS_PATH,
    icon: <SettingsIcon/>,
  },
]

export default function SideNav({children}: ISideNavProps) {
  return (
    <Box sx={{marginTop: 10}}>
      <CssBaseline/>
      <Drawer open variant='permanent'>
        <DrawerHeader>
          <Logo src={LOGO} alt='logo' onClick={toHomePage}/>
        </DrawerHeader>
        <Divider/>
        <List>
          {navItems?.map(({name, icon, url}) => (
            <ListItem key={name} disablePadding>
              <ListItemButton onClick={() => redirectTo(url)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} sx={{opacity: 1}}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component='main' sx={{marginLeft: 30, p: 1}}>
        {children}
      </Box>
    </Box>
  )
}

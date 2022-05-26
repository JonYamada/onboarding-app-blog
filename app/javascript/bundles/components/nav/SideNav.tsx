import React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiDrawer from '@mui/material/Drawer'
import SettingsIcon from '@mui/icons-material/Settings'
import {ARTICLES_PATH, SETTINGS_PATH} from '../../constants/routes'
import {CSSObject, styled, Theme} from '@mui/material/styles'
import {CssBaseline, useTheme} from '@mui/material'
import {ISideNavProps} from './interfaces'
import {LOGO} from '../../constants/images'
import {redirectTo, toHomePage} from '../../utils/nav'

const openedMixin = (theme: Theme, width: number): CSSObject => ({width, overflowX: 'hidden'})

const DrawerHeader = styled('div')(({theme}) =>
  ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }))

const Logo = styled('img')(({onClick}) =>
  ({
    cursor: onClick ? 'pointer' : 'default',
    width: 36,
  }))

const Drawer = styled(MuiDrawer)(({theme, width}: { theme: Theme, width: number }): CSSObject =>
  ({
    width,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...openedMixin(theme, width),
    '& .MuiDrawer-paper': openedMixin(theme, width),
  }),
)

const navItems = [
  {
    icon: <FeedOutlinedIcon/>,
    name: 'Articles',
    url: ARTICLES_PATH,
  },
  {
    icon: <SettingsIcon/>,
    name: 'Settings',
    url: SETTINGS_PATH,
  },
]

export default function SideNav({children, width}: ISideNavProps) {
  const theme = useTheme()

  return (
    <Box sx={{marginTop: 10}}>
      <CssBaseline/>
      <Drawer width={width} variant='permanent' theme={theme}>
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
      <Box component='main' sx={{ml: width / 8, p: 2}}>
        {children}
      </Box>
    </Box>
  )
}

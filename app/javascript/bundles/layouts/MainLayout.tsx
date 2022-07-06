import React, { useState } from "react";
import "../assets/stylesheets/forms.scss";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import MuiAppBar from "@mui/material/AppBar";
import SideNav from "../components/nav/SideNav";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import { IAppBarProps } from "../components/nav/interfaces";
import { IMainLayoutProps } from "./interfaces";
import { styled } from "@mui/material/styles";
import { theme } from "../config/theme/theme";
import { buttonText } from "../config/translations/en.json";
import { getCurrentUser, isLoggedIn } from "../utils/AuthConnector";
import { routes } from "../api/setup";

const defaultProps = {
  className: null,
};

const AVATAR_MENU = "avatar-menu";
const drawerWidth = 200;

const MainLayout = ({ className, children }: IMainLayoutProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const AppBar = styled(MuiAppBar)<IAppBarProps>(({ theme }) => ({
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: theme.zIndex.drawer + 1,
  }));

  const AvatarDropdown = () => (
    <Box>
      <IconButton
        aria-controls={open ? AVATAR_MENU : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
      >
        <Avatar alt="user avatar">{getCurrentUser().initials}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={AVATAR_MENU}
        onClick={handleClose}
        onClose={handleClose}
        open={open}
      >
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {buttonText.logout}
        </MenuItem>
      </Menu>
    </Box>
  );

  const LogoutButton = () => (
    <Link href={routes?.sessions?.create} sx={{ color: "white" }}>
      {buttonText.login}
    </Link>
  );

  const renderTopNavItems = () => {
    const items = [
      ...(isLoggedIn()
        ? [
            {
              key: "profile",
              content: <AvatarDropdown />,
            },
          ]
        : [
            {
              key: "login",
              content: <LogoutButton />,
            },
          ]),
    ];

    return items.map(({ content, key }) => (
      <Box key={key} sx={{ marginLeft: "auto" }}>
        {content}
      </Box>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={className}>
        <AppBar position="fixed" open>
          <Toolbar>{renderTopNavItems()}</Toolbar>
        </AppBar>
        <SideNav width={drawerWidth}>{children}</SideNav>
      </Box>
    </ThemeProvider>
  );
};

MainLayout.defaultProps = defaultProps;

export default MainLayout;

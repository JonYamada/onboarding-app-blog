import React, { useRef, useState } from "react";
import { Avatar, Box, IconButton, Link, Menu, MenuItem } from "@mui/material";
import { routes } from "../../api/setup";
import { buttonText } from "../../config/translations/en.json";
import { logout } from "../../api/auth/auth";
import { redirectTo } from "../../utils/nav";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";

const defaultProps = {
  initials: null,
  isAuthenticated: false,
};

interface ITopNav {
  initials?: string;
  isAuthenticated: boolean;
}

const AVATAR_MENU = "avatar-menu";

const TopNav = ({ initials, isAuthenticated }: ITopNav) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const open = !!anchorEl;
  const anchorRef = useRef(undefined);

  const handleClose = () => setAnchorEl(null);

  const handleClick = () => setAnchorEl(anchorRef?.current);

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
        <Avatar alt="user avatar">{initials}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id={AVATAR_MENU}
        onClick={handleClose}
        onClose={handleClose}
        open={open}
      >
        <MenuItem
          onClick={() => {
            logout().then(() => {
              redirectTo(routes?.articles?.index || "/");
            });
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {buttonText.logout}
        </MenuItem>
      </Menu>
    </Box>
  );

  const LoginButton = () => (
    <Link href={routes?.sessions?.create} sx={{ color: "white" }}>
      {buttonText.login}
    </Link>
  );

  const renderItems = () => {
    const items = [
      ...(isAuthenticated
        ? [
            {
              key: "profile",
              content: <AvatarDropdown />,
            },
          ]
        : [
            {
              key: "login",
              content: <LoginButton />,
            },
          ]),
    ];

    return items.map(({ content, key }) => (
      <Box key={key} sx={{ marginLeft: "auto" }}>
        {content}
      </Box>
    ));
  };

  return <Box ref={anchorRef}>{renderItems()}</Box>;
};

TopNav.defaultProps = defaultProps;

export default TopNav;

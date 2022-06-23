import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled } from "@mui/material/styles";
import { CssBaseline, useTheme } from "@mui/material";
import { ISideNavProps } from "./interfaces";
import { LOGO } from "../../constants/images";
import { redirectTo } from "../../utils/nav";
import { nav } from "../../config/translations/en.json";
import { getRoutes } from "../../utils/routes";
import { IRoutes } from "../interfaces";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Logo = styled("img")(({ onClick }) => ({
  cursor: onClick ? "pointer" : "default",
  width: 36,
}));

const Drawer = styled(MuiDrawer)(
  ({ width }: { width: number }): CSSObject => ({
    width,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    overflowX: "hidden",
    "& .MuiDrawer-paper": { width, overflowX: "hidden" },
  })
);
const SideNav = ({ children, width }: ISideNavProps) => {
  const theme = useTheme();

  const [routes, setRoutes] = useState<IRoutes>();

  useEffect(() => {
    setRoutes(getRoutes());
  }, []);

  const ROOT_PATH = routes?.root;

  const navItems = [
    {
      icon: <FeedOutlinedIcon />,
      name: nav.articles,
      url: routes?.articles?.index,
    },
  ];

  return (
    <Box sx={{ marginTop: 10 }}>
      <CssBaseline />
      <Drawer width={width} variant="permanent" theme={theme}>
        <DrawerHeader>
          <Logo
            src={LOGO}
            alt="logo"
            onClick={() => {
              if (ROOT_PATH) redirectTo(ROOT_PATH);
            }}
          />
        </DrawerHeader>
        <Divider />
        <List>
          {navItems?.map(
            ({ name, icon, url }) =>
              url && (
                <ListItem key={name} disablePadding>
                  <ListItemButton onClick={() => redirectTo(url)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={name} sx={{ opacity: 1 }} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ ml: width / 8, p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default SideNav;

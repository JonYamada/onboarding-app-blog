import React from "react";
import "../assets/stylesheets/forms.scss";
import MuiAppBar from "@mui/material/AppBar";
import SideNav from "../components/nav/SideNav";
import { Box, ThemeProvider, Toolbar } from "@mui/material";
import { IAppBarProps } from "../components/nav/interfaces";
import { IMainLayoutProps } from "./interfaces";
import { getCurrentUser, isLoggedIn } from "../utils/AuthConnector";
import { styled } from "@mui/material/styles";
import { theme } from "../config/theme/theme";
import TopNav from "../components/nav/TopNav";

const defaultProps = {
  className: null,
};

const drawerWidth = 200;

const MainLayout = ({
  children,
  className,
  initials = getCurrentUser()?.initials,
  isAuthenticated = isLoggedIn(),
}: IMainLayoutProps) => {
  const AppBar = styled(MuiAppBar)<IAppBarProps>(({ theme }) => ({
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: theme.zIndex.drawer + 1,
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box className={className}>
        <AppBar position="fixed" open>
          <Toolbar sx={{ justifyContent: "end" }}>
            <TopNav initials={initials} isAuthenticated={isAuthenticated} />
          </Toolbar>
        </AppBar>
        <SideNav width={drawerWidth}>{children}</SideNav>
      </Box>
    </ThemeProvider>
  );
};

MainLayout.defaultProps = defaultProps;

export default MainLayout;

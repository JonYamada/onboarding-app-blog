import React from "react";
import "../assets/stylesheets/forms.scss";
import { Box } from "@mui/material";
import { IAuthLayoutProps } from "./interfaces";
import Grid from "@mui/material/Grid";

const defaultProps = {
  className: null,
};

const AuthLayout = ({ className, children }: IAuthLayoutProps) => {
  return (
    <Grid
      container
      className={className}
      columnSpacing={2}
      rowSpacing={2}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        spacing: 4,
      }}
    >
      <Grid item xs={12} sm={6}>
        <Box>
          <img
            src="https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ"
            width="100%"
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        {children}
      </Grid>
    </Grid>
  );
};

AuthLayout.defaultProps = defaultProps;

export default AuthLayout;

import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {
  function Copyright(props) {
    return (
      <Typography variant="body2" color="white" align="center" {...props}>
        {"Copyright © "} Kamonchanok Phutthawong
        <Link color="inherit" href="https://line.me/ti/p/LEY9vCwL00" target="_blank" sx={{ ml: 1, mr: 1 }}>
          Contact Me
        </Link>
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        sx={{ position: "fixed", zIndex: 99 ,bottom: 0, left: 0, right: 0, py: 1, backgroundColor: "primary.main" }}
        elevation={3}
      >
        <Copyright />
      </Paper>
    </Box>
  );
}

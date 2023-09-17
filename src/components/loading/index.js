import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({ isLoading, handleCloseLoading }) {
  useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        handleCloseLoading();
      }, 300);
    }
  }, [isLoading]);

  return (
    <Backdrop open={isLoading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress
        size={70}
        color="inherit"
        sx={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      />
    </Backdrop>
  );
}

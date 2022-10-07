import { Alert, AlertColor } from "@mui/material";
import MUISnackbar from "@mui/material/Snackbar";
import { SyntheticEvent, useEffect, useState } from "react";

export type SnackbarProps = {
  message: string;
  type: AlertColor;
  onClose?: () => void;
};

export function Snackbar({ message, type = "error", onClose }: SnackbarProps) {
  const [open, setOpen] = useState(true);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    setOpen(true);
  }, [message]);

  return (
    <MUISnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
}

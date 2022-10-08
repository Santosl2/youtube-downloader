import { Button as MUIButton, CircularProgress } from "@mui/material";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  icon?: React.ReactNode;
  size: "small" | "medium" | "large";
};

export function Button({
  children,
  onClick,
  isLoading,
  icon,
  size,
}: ButtonProps) {
  return (
    <MUIButton
      size={size}
      variant="contained"
      onClick={onClick}
      disabled={isLoading}
      startIcon={isLoading ? <CircularProgress size={24} /> : icon}
    >
      {children}
    </MUIButton>
  );
}

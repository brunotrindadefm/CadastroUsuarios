export interface SnackbarProps {
    message: string;
    variant: "success" | "warning" | "error";
    autoHideDuration: number;
  }  
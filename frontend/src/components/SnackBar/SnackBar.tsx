import { enqueueSnackbar, closeSnackbar } from 'notistack';
import { IoCloseSharp } from 'react-icons/io5';

import { SnackbarProps } from '../../interfaces/SnackbarProps';

const Snackbar = ({ message, variant, autoHideDuration }: SnackbarProps) => {
  const snackbarKey = enqueueSnackbar(message, {
    variant,
    autoHideDuration,
    action: (
      <IoCloseSharp className="close-snackbar" onClick={() => closeSnackbar(snackbarKey)} />
    ),
  });

  return null;
};

export default Snackbar;
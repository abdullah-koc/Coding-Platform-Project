import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Button, Grid, Pagination } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));



const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DonationDialog() {
  const [open, setOpen] = React.useState(true);

  function donate() {
    alert("Donated!");
    window.history.back();
  }

  return (
    <div>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title">
          Welcome to the Donation Page!
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container width="500px">
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-iban">
                  Company IBAN No
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-iban"
                  label="Company IBAN No"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Donation Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  endAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Donation Amount"
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => donate()}>Donate</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

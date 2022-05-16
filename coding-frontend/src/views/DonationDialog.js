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
import PaymentForm from "../components/CompanyComponents/PaymentForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";



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
  let navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).company_id !== null) {
      navigate("/");
    }
  }, []);

  const getContestID = () => {
    const contestID = window.location.href.split("/");
    return contestID[contestID.length - 2];
  };
  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
        "api/company/get/donation/" +
        JSON.parse(localStorage.getItem("session")).company_id +
        "/" +
        getContestID()
      )
      .then((res) => {
        if (res.data > 0) {
          alert("You have already donated to this contest");
          navigate("/company");
        }
      });
  }, []);
  const [open, setOpen] = React.useState(true);
  const [donationAmount, setDonationAmount] = React.useState(0);

  function donate() {
    if (donationAmount === 0) {
      alert("You cannot donate 0 money");
      return;
    }
    axios.post(
      process.env.REACT_APP_URL +
      "api/company/donate/" +
      JSON.parse(localStorage.getItem("session")).company_id +
      "/" +
      getContestID() +
      "/" +
      donationAmount
    );
    alert("Donated!");
    navigate("/company");
  }

  function cancel() {
    navigate("/company");
  }

  return (
    <div>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title">
          Welcome to the Donation Page!
        </BootstrapDialogTitle>
        <DialogContent dividers>
          Please Enter Your Company's Card Information
          <div style={{ paddingTop: "20px" }}>
            <Grid container width="550px">
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PaymentForm></PaymentForm>
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Donation Amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    endAdornment={
                      <InputAdornment position="start">TL</InputAdornment>
                    }
                    label="Donation Amount"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <Grid container style={{ paddingLeft: "400px" }}>
          <div>
            <DialogActions>
              <Button onClick={() => donate()}>Donate</Button>
            </DialogActions>
          </div>
          <div>
            <DialogActions>
              <Button onClick={() => cancel()}>Cancel</Button>
            </DialogActions>
          </div>
        </Grid>
      </BootstrapDialog>
    </div>
  );
}

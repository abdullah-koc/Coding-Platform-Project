import React from "react";
import Cards from "react-credit-cards";
import { Button, Grid, Input, Pagination } from "@mui/material";
import "react-credit-cards/es/styles-compiled.css";

export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <Grid container style={{paddingTop: "20px"}}>
          <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <form>
              <Input
                type="tel"
                name="number"
                placeholder="Card Number"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </form>
          </Grid>
          <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </Grid>
         <Grid container style={{paddingTop: "10px"}}>
         <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Input
              type="tel"
              name="expiry"
              placeholder="Expiration Date"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </Grid>
          <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Input
              type="tel"
              name="cvc"
              placeholder="CVC"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </Grid>
         </Grid>
        </Grid>
      </div>
    );
  }
}

import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";


export default function CheckoutWizard({ activeStep = 0 }) {
 
  return (
    <Stepper
     
      activeStep={activeStep}
      alternativeLabel
    >
      {["PERSONAL INFORMATION", "SHIPPING ADDRESS", "SHIPPING METHOD", "PAYMENT"].map(
        (step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        )
      )}
    </Stepper>
  );
}

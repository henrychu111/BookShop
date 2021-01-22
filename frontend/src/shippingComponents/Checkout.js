import { makeStyles, withStyles, Step, StepLabel, Stepper, StepConnector } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { AccountCircle, LocalShipping, Payment, ShoppingBasket } from '@material-ui/icons'

function Checkout(props) {
    const steps = ["Signin", "Shipping", "Payment", "Place Order"]
    const {activeStep} = props
    return (
        <Stepper style={{width: "50%", margin: "auto"}} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    )
}

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
        'linear-gradient( 136deg, rgb(50,113,100) 0%, rgb(50,64,100) 50%, rgb(50,35,20) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
        'linear-gradient( 136deg, rgb(100,113,100) 0%, rgb(100,64,100) 50%, rgb(100,35,50) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(50,113,100) 0%, rgb(50,64,100) 50%, rgb(50,35,20) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(100,113,100) 0%, rgb(100,64,100) 50%, rgb(100,35,50) 100%)',
    },
  });

  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <AccountCircle />,
      2: <LocalShipping />,
      3: <Payment />,
      4: <ShoppingBasket />
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

export default Checkout;
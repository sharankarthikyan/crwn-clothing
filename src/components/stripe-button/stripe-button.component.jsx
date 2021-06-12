import React from "react";
import StripeCheckout from "react-stripe-checkout";

import "./stripe-button.styles.scss";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J1Nq8SFzAbMR3APuuFgMoEmpzNoj1wqtLPs2eyV2wsnoJNmbksDQACcvwn57jmb2YmYLGMDMT8E9tt63SJVNmHi004QG0luX9";

  const onToken = (token) => {
    console.log(token);
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Pvt. Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

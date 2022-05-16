import React from 'react';
import scriptLoader from 'react-async-script-loader';
import axios from 'axios';
import UploadButtons from "./UploadButton";

const CURRENCY = 'eur';

const toCent = amount => amount * 100;

const StripeForm = ({ isScriptLoaded, isScriptLoadSucceed }) => {
  const [stripe, setStripe] = React.useState(null);

  React.useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      setStripe(window.Stripe('pK_test....'));
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);

  const [amount, setAmount] = React.useState(0);

  const handleSubmit = async event => {
    event.preventDefault();

    const session = await axios.post(
      'http://localhost:7777/payment/session-initiate',
      {
        customerEmail: 'example@gmail.com',
        clientReferenceId:
          'IDENTIFIER_TO_MAP_YOUR_CUSTOMER_TO_YOUR_PRODUCT_LATER',
        lineItem: {
          name: 'My Name',
          description: 'My Description',
          images: ['http://localhost:7777/static/product.jpg'],
          amount: toCent(amount),
          currency: CURRENCY,
          quantity: 1,
        },
        successUrl: 'http://localhost:3000/success',
        cancelUrl: 'http://localhost:3000/cancel',
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });

    console.log(result.error.message);
  };



  return (
    <form onSubmit={handleSubmit}>

      <input
        type="number"
        value={amount}
        onChange={event => setAmount(event.target.value)}
      />
      Euro
      <button type="submit">Buy</button>
    </form>
  );
};
export default scriptLoader('https://js.stripe.com/v3/')(StripeForm);

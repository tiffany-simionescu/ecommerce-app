import React, { useEffect, useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../functions/stripe';
import { createOrder, emptyUserCart } from '../../functions/user';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
// import Laptop from '../../images/macbook.jpg';
import Violin from '../../images/payment-violin.jpeg';
import { numberFormat } from '../../functions/product'

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(user.token, coupon)
    .then(res => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      // additional res recieved on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    const cardElement = elements.getElement(CardElement);

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      createOrder(user.token, payload)
      .then(res => {
        if (res.data.ok) {
          // empty cart from localStorage
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
          // empty cart from Redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false
          });
          // empty cart from DB
          emptyUserCart(user.token);
        }
      })
      // create order and save in DB for admin to process
      // empty user cart from redux store and localStorage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      cardElement.clear();
    }
  };

  const handleChange = (e) => {
    // listen for changes in the card element
    // and display any errors as the customer types their
    // card details
    setDisabled(e.empty); // disable pay buttons if errors
    setError(e.error ? e.error.message : "");
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
    {
      !succeeded && <div>
        {coupon && totalAfterDiscount !== undefined ? (
          <p className="alert alert-success">
            {`Total after discount: $${totalAfterDiscount}`}
          </p>
        ) : (
          <p className="alert alert-danger">No coupon applied</p>
        )}
      </div>
    }
      <div className="text-center pb-5">
        <Card 
          cover={
            <img 
              src={Violin} 
              style={{ 
                height: "300px", 
                objectFit: "cover", 
                marginBottom: "-50px" 
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {numberFormat(cartTotal)}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total Payable: $
              {numberFormat(payable / 100)}
            </>,
          ]}
        />
      </div>
          <p style={{ color: "grey" }}>
            To test, enter card number 
            4242 4242 4242 4242 and any numbers for MM/YY CVC.
          </p>
      <form 
        id="payment-form"
        className="stripe-form"
        onSubmit={handleSubmit}
      >
        <CardElement 
          id="card-element"
          options={cartStyle} 
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay"
            )}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment Successful.{" "}
          <Link to="/user/history">
            See it in you Purchase History
          </Link> 
        </p>
      </form>
    </>
  )
};

export default StripeCheckout;
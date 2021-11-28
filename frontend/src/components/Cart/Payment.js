import React, { Fragment, useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {useAlert} from 'react-alert';
import axios from 'axios';
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {createOrder, clearErrors} from '../../actions/order';

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.postal_code,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        setIsLoading(false);
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      setIsLoading(false);
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
  }, [error, alert, dispatch])

  return (
    <Fragment>
      <MetaData title='Payment' />
      <CheckoutSteps activeStep={2} />
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Details</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className='paymentInput' />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className='paymentInput' />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className='paymentInput' />
          </div>

          <input
            type='submit'
            value={`${!isLoading ? 'Pay' : 'Paying...'} ₹${orderInfo && orderInfo.totalPrice}`}
            className='paymentFormBtn'
            disabled={isLoading}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;

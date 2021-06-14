import React from 'react';
import { numberFormat } from '../../functions/product';

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <br />
      <span>Order Id: {order.paymentIntent.id}</span>
      <br />
      <span>Amount: ${numberFormat(order.paymentIntent.amount /= 100)}</span>{" | "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>{" | "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>{" | "}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{" | "}
      <span>
        Ordered On:{" "}
        {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}
      </span>{" "}
      <br />
      {showStatus && (
        <span className="badge" style={{ 
          background: 
            order.orderStatus === "Not Processed" ? "red" : 
            order.orderStatus === "Processing" ? "orange" : 
            order.orderStatus === "Dispatched" ? "lightblue" : 
            order.orderStatus === "Cancelled" ? "lightgrey" :
            order.orderStatus === "Cash On Delivery" ? "darkviolet" : 
            order.orderStatus === "Completed" ? "green" : "",

          color: 
            order.orderStatus === "Cash On Delivery" ? "white" :
            order.orderStatus === "Completed" ? "white" :
            order.orderStatus === "Not Processed" ? "white": ""
        }}>
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
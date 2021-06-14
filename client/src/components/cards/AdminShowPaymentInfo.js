import React from 'react';
import { numberFormat } from '../../functions/product';

const AdminShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Ordered By: {order.orderedBy.address[0].name}</span>
      <br />
      <span>
        Shipping Address: {" "}
        {order.orderedBy.address[0].street}, {" "} 
        {order.orderedBy.address[0].apt !== "" ? 
          `Apt: ${order.orderedBy.address[0].apt}, ${order.orderedBy.address[0].city}` : 
          order.orderedBy.address[0].city}, {" "}
          {order.orderedBy.address[0].state}, {" "}
          {order.orderedBy.address[0].postalCode}
      </span>
      <br />
      <span>Order Id: {order.paymentIntent.id}</span>
      {console.log("ORDER ID INFO --> ", order.paymentIntent)}
      <br />
      <span>Amount: ${numberFormat(order.paymentIntent.amount /= 100)}</span>{" | "}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>{" | "}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      <br />
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{" | "}
      <span>
        Ordered On:{" "}
        {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}
      </span>{" "}
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default AdminShowPaymentInfo;
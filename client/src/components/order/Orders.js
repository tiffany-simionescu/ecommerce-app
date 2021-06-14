import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AdminShowPaymentInfo from '../cards/AdminShowPaymentInfo'; 
import { numberFormat } from '../../functions/product';

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th 
            style={{ border: "1px solid black"}} scope="col"><b>Title</b></th>
          <th style={{ border: "1px solid black"}} scope="col"><b>Price</b></th>
          <th style={{ border: "1px solid black"}} scope="col"><b>Brand</b></th>
          <th style={{ border: "1px solid black"}} scope="col"><b>Color</b></th>
          <th style={{ border: "1px solid black"}} scope="col"><b>Quantity</b></th>
          <th style={{ border: "1px solid black"}} scope="col"><b>Shipping</b></th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td style={{ border: "1px solid black"}}><b>{p.product.title}</b></td>
            <td style={{ border: "1px solid black"}}>${numberFormat(p.product.price)}</td>
            <td style={{ border: "1px solid black"}}>{p.product.brand}</td>
            <td style={{ border: "1px solid black"}}>{p.color}</td>
            <td style={{ border: "1px solid black"}}>{p.count}</td>
            <td style={{ border: "1px solid black"}}>{p.product.shipping === "Yes" ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              <CloseCircleOutlined style={{ color: "red" }} />
            )}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
  <>
    {orders.map((order) => (
      <div key={order._id} className="row pb-5">
        <div className="btn btn-block bg-light text-left pb-0" style={{ border: "1px solid black"}}>
        <AdminShowPaymentInfo order={order} showStatus={false} />
        <div 
          className="row" 
          key={order._id}
          style={{ 
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
          }}
        >
          <div className="col-md-4 mt-2 pl-5">Delivery Status</div>
          <div className="col-md-8">
            <select 
              className={`form-control`}
              style={{ 
                width: "200px", 
                color: 
                order.orderStatus === "Not Processed" ? "white" : 
                order.orderStatus === "Cash On Delivery" ? "white" :   
                order.orderStatus === "Processing" ? "black" :
                order.orderStatus === "Dispatched" ? "black" :
                order.orderStatus === "Cancelled" ? "black" :
                order.orderStatus === "Completed" ? "white" : ""
              }}
              onChange={e => handleStatusChange(order._id, e.target.value)}
              defaultValue={order.orderStatus}
              name="status"
            >
              <option style={{ color: "black" }} value="Not Processed">
                Not Processed
              </option>
              <option style={{ color: "black" }} value="Cash On Delivery">
                Cash On Delivery
              </option>
              <option style={{ color: "black" }} value="Processing">
                Processing
              </option>
              <option style={{ color: "black" }} value="Dispatched">
                Dispatched
              </option>
              <option style={{ color: "black" }} value="Cancelled">
                Cancelled
              </option>
              <option style={{ color: "black" }} value="Completed">
                Completed
              </option>
            </select>
          </div>
        </div>
        </div>

        {showOrderInTable(order)}
      </div>
    ))}
  </>
  );
};

export default Orders;
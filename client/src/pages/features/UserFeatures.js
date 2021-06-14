import React from 'react';
import FeaturesNav from '../../components/nav/FeaturesNav';

const UserFeatures = () => {
  return (
    <div className="container-fluid pr-5">
    <div className="row">
      <div className="col-md-2">
        <FeaturesNav />
      </div>
    
      <div className="col-md-10 mt-3">
        <h4>User Features</h4>
        <div className="text-center">
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>User Dashboard</h6>
            <p>
              This is your main User dashboard. Here is where you can view your 
              order history. The status of your orders are color-coded for easy 
              readability. You also have the ability to view and download a PDF of 
              your orders.
            </p>
            <img 
              className="mw-100 mb-3 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_800/v1622693062/user-orders-2_zqi41h.png" 
              alt="user-img-1" 
            />
            <img 
              className="mw-100 ml-4"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/v1622692926/user-invoice-2_ex67o3.png" 
              alt="user-img-2" 
            />
          </div>
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Wishlist</h6>
            <p>
              When you view individual products in the shop, you can add products 
              to your wishlist. This section allows you to view or remove products 
              from your wishlist.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_800/v1622692536/user-wishlist-2_ewd5hw.png" 
              alt="user-img-3" 
            />
          </div>
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Password</h6>
            <p>
              This section allows you to update your password. Both Admin and User 
              have this ability.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_496/v1621884961/user-admin-password_zuqduu.png" 
              alt="user-img-4" 
            />
          </div>
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Checkout</h6>
            <p>
              During checkout, you enter your address, a coupon code if you have one, 
              and whether you wish to pay by card or COD (Cash On Delivery). Your address 
              will be saved for future use to make checkout faster. If you choose to pay 
              by card, your payment will be handled by a secure service called Stripe.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_800/v1622693259/user-checkout-2_fpv0gt.png" 
              alt="user-img-5" 
            />
            <img 
              className="mw-100"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/v1622692753/user-payment-2_xyy8au.png" 
              alt="user-img-6" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

export default UserFeatures;
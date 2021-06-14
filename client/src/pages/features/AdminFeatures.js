import React from 'react';
import FeaturesNav from '../../components/nav/FeaturesNav';

const AdminFeatures = () => {
  return (
    <div className="container-fluid pr-5">
    <div className="row">
      <div className="col-md-2">
        <FeaturesNav />
      </div>
    
      <div className="col-md-10 mt-3">
        <h4>Admin Features</h4>
        <div className="text-center">
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Admin Dashboard</h6>
            <p>
              This is your main Admin dashboard. Here is where you can view customer 
              orders, and update their order status. Each order status has a unique color 
              to visually help identity which orders require your attention.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_800/v1622693673/admin-dashboard-2_uh16mv.png" 
              alt="admin-img-1" 
            />
          </div>
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Create a New Product</h6>
            <p>
              This section allows you to create a new product for your store's inventory. 
              You can add multiple images, title, description, size, price, if shipping is available, 
              quantity, color, brand, categories, and subcategories. All of your products will
              show up in both the shop page and the Product List section of your dashboard.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/v1622693607/admin-products-2_c4ydrp.png" 
              alt="admin-img-2" 
            />
          </div>
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Product List</h6>
            <p>
              This section lists all of your created products from the database. 
              You have the option to edit or remove products from your inventory here.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_800/v1622693535/admin-all-products-2_dcwdxh.png" 
              alt="admin-img-3" 
            />
          </div>
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Create a New Category</h6>
            <p>
              This section gives you the ability to create a new category. You also 
              have the option to edit or remove categories. Your created categories will be 
              added to the shop page. Customers can filter through different products via 
              categories and other search filters.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_800/v1622693735/admin-category-2_daame4.png" 
              alt="admin-img-4" 
            />
          </div>
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Create a New Subcategory</h6>
            <p>
              This section gives you the ability to create a new subcategory. You also 
              have the option to edit or remove subcategories. Your created subcategories will be 
              added to the shop page. Customers can filter through different products via 
              subcategories and other search filters.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_800/v1622693449/admin-sub-2_h6ghtg.png" 
              alt="admin-img-5" 
            />
          </div>
          <div className="container pt-4 pb-4 mb-5" style={{ border: "1px solid grey" }}>
            <h6>Create a New Coupon</h6>
            <p>
              This section allows you to create coupons for your customers to use. You have 
              the ability to give them unique names, the amount to be discounted, and date of 
              expiration. Customers can use coupons during checkout.
            </p>
            <img 
              className="mw-100 mt-2"
              src="https://res.cloudinary.com/dzw1fju6k/image/upload/c_scale,w_800/v1621885055/admin-coupon_anec5p.png" 
              alt="admin-img-6" 
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
              alt="admin-img-7" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

export default AdminFeatures;
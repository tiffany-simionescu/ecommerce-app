import React, { useEffect, useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverageWithStarCount } from '../../functions/rating';
import { addToWishlist } from '../../functions/user';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

// This is child component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState('Click to add');
  const { title, images, description, _id } = product;

  const colors = [
    "Yellow", "Amber", "Golden Yellow", "Golden Brown", 
    "Red", "Red Brown", "Brown", "Dark Brown"
  ];
  const sizes = [
    "4/4", "3/4", "1/2", "1/4", "1/8", 
    "1/10", "1/16", "16.5", "16", "15.5", 
    "15", "14", "13", "12"
  ];

  // redux
  const { user, pastProduct } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch(); 
  // router
  let history = useHistory();

  useEffect(() => {
    if (pastProduct && pastProduct._id === product._id) {
      localStorage.setItem('product', JSON.stringify(pastProduct));
      dispatch({
        type: "UPDATED_PRODUCT",
        payload: pastProduct,
      });
    }
  }, []);

  const handleAddToCart = () => {
    if (product.quantity < 1) {
      return;
    }
    // create cart array
    let cart = [];
    // check if window object is available - localStorage
    if (typeof window !== 'undefined') {
      // if cart is in localStarge GET it
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      if (localStorage.getItem('product')) {
        product = JSON.parse(localStorage.getItem('product'))
      }
      // push new product to cart
      cart.push({
        ...product,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual)
      // save to localStorage
      localStorage.setItem('cart', JSON.stringify(unique));
      // show tooltip
      setTooltip('Added');

      // add to redux state
      dispatch({
        type: "ADD_TO_CART", 
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE", 
        payload: true,
      });
    };
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Must be logged in to Add to Wishlist");
    } else {
      addToWishlist(user.token, product._id)
      .then(res => {
        console.log("ADD TO WISHLIST", res);
        toast.success("Added to wishlist");
        history.push('/user/wishlist')
      })
    }
  };

  const handleColorChange = (e) => {
    console.log('color change', e.target.value);
    
    let product = {};
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('product')) {
        product = JSON.parse(localStorage.getItem('product'));
      }

      product.color = e.target.value;

      localStorage.setItem('product', JSON.stringify(product));
      dispatch({
        type: "UPDATED_PRODUCT", 
        payload: product,
      });
      dispatch({
        type: "PAST_PRODUCT",
        payload: product,
      });
    }
  };
  
  const handleSizeChange = (e) => {
    console.log('size change', e.target.value);

    let product = {};
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('product')) {
        product = JSON.parse(localStorage.getItem('product'));
      }
  
      product.size = e.target.value;
      
      localStorage.setItem('product', JSON.stringify(product));
      dispatch({
        type: "UPDATED_PRODUCT",
        payload: product,
      });
      dispatch({
        type: "PAST_PRODUCT",
        payload: product,
      });
    };
  };
  
  const handleQuantityChange = (e) => {
    // console.log('available quantity', product.quantity);

    let product = {};
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('product')) {
        product = JSON.parse(localStorage.getItem('product'));
      }
  
      product.count = e.target.value;

      if (product.count > product.quantity) {
        toast.error(`Please select ${product.quantity} or less for Quantity.`);
      } else {
        localStorage.setItem('product', JSON.stringify(product));
        dispatch({
          type: "UPDATED_PRODUCT",
          payload: product,
        });
        dispatch({
          type: "PAST_PRODUCT",
          payload: product,
        });
      }
    };
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us at XXX XXX XXXX to learn more about this product.
          </TabPane>
        </Tabs>
      </div>
      
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverageWithStarCount(product) 
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip title={product.quantity > 0 ? tooltip : 'Out of Stock'}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" /> <br />
                {product.quantity < 1 ? ("Out of Stock") : ("Add to Cart")}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist} disabled={!user}>
              <HeartOutlined className="text-info" />
              <br />
              Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>
          ]}
        >
          <ProductListItems 
            product={product} 
            pastProduct={pastProduct}
            handleColorChange={handleColorChange} 
            handleSizeChange={handleSizeChange} 
            handleQuantityChange={handleQuantityChange} 
            colors={colors}
            sizes={sizes}
          />
        </Card>
      </div>
    </>
  )
};

export default SingleProduct;
import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import {EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import laptop from '../../images/laptop.png';
import { Link } from 'react-router-dom';
import { showAverage } from '../../functions/rating';
import { numberFormat } from '../../functions/product';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState('Click to add');

  // redux
  const dispatch = useDispatch(); 

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
      // push new product to cart
      cart.push({
        ...product,
        count: 1
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

  const handleProductState = () => {
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

  // destructure
  const { images, title, description, slug, price } = product;

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No ratings yet</div>
      )}

      <Card 
        cover={
          <img 
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }

        actions={[
          <Link to={`/product/${slug}`} onClick={handleProductState}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>, 
          <Tooltip title={product.quantity > 0 ? tooltip : 'Out of Stock'}>
            <a onClick={handleAddToCart} disabled={product.quantity < 1}>
              <ShoppingCartOutlined className="text-danger" /> <br /> 
              {product.quantity < 1 ? ("Out of Stock") : ("Add to Cart")}
            </a>
          </Tooltip>
        ]}
      >

        <Meta
          title={`${title} - $${numberFormat(price)}`}
          description={`${description && description.substring(0, 40)}...`} 
        />
      </Card>
    </>
  );
};

export default ProductCard;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { numberFormat } from '../functions/product';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

const Cart = ({ history }) => {
  // redux
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  // [1, 2] 100 + 200 = 300

  useEffect(() => {
    dispatch({
      type: "UPDATED_PRODUCT", 
      payload: '',
    });
  }, []);

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart));
    userCart(user.token, cart)
    .then(res => {
      console.log('CART POST RES', res);
      if (res.data.ok) {
        history.push('/checkout');
      }
    })
    .catch(err => {
      console.log("cart save err", err);
    })
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(user.token, cart)
    .then(res => {
      console.log('CART POST RES', res);
      if (res.data.ok) {
        history.push('/checkout');
      }
    })
    .catch(err => {
      console.log("cart save err", err);
    })
  };

  const showCartItems = () => (
    <div style={{ overflowX: "auto" }}>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col" >Image</th>
            <th scope="col" >Title</th>
            <th scope="col" >Price</th>
            <th scope="col" >Brand</th>
            <th scope="col" >Size</th>
            <th scope="col" >Color</th>
            <th scope="col" >Quantity</th>
            <th scope="col" >Shipping</th>
            <th scope="col" >Remove</th>
          </tr>
        </thead>

        {cart.map((p) => (
          <ProductCardInCheckout key={p._id} product={p} />
        ))}
      </table>
    </div>
  );

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Cart / 
              {cart.length === 1 ? (
                "1 Product"
              ) : (
                `${cart.length} Products`
              )}
          </h4>

          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>{c.title} x {c.count} = ${numberFormat(c.price * c.count)}</p>
            </div>
          ))}
          <hr />
          Total: <b>${numberFormat(getTotal())}</b>
          <hr />
          {
            user ? (
              <>
                <button 
                  onClick={saveOrderToDb} 
                  className="btn btn-sm btn-primary mt-2"
                  disabled={!cart.length}
                >
                  Proceed to Checkout
                </button>
                <br />
                <button 
                  onClick={saveCashOrderToDb} 
                  className="btn btn-sm btn-warning mt-2"
                  disabled={!cart.length}
                >
                  Pay Cash on Delivery
                </button>
              </>
            ) : (
              <button className="btn btn-sm btn-primary mt-2">
                <Link to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                >
                  Login to Checkout
                </Link>
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
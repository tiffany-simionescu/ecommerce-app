import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getUserCart, 
  emptyUserCart, 
  saveUserAddress,
  getUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from '../functions/user';
import { numberFormat } from '../functions/product';
import { toast } from 'react-toastify';
import AddressForm from '../components/forms/AddressForm';
import { Link } from 'react-router-dom';

let initialState = {
  name: '',
  street: '', 
  apt: '', 
  city: '', 
  state: '', 
  postalCode: '', 
  country: '',
};

const Checkout = ({ history }) => {
  const [address, setAddress] = useState(initialState);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  useEffect(() => {
    loadAddress();
    loadUserCart();
  }, [user]);

  const loadAddress = () => {
    getUserAddress(user.token)
    .then(res => {
      // console.log(res.data.address[0]);
      if (res.data.address[0] === undefined) {
        setAddressSaved(false);
      } else {
        setAddressSaved(true);
        setAddress({ ...address, ...res.data.address[0] });
        // console.log('Address State --> ', res.data.address[0]);
      }
    })
  };

  const loadUserCart = () => {
    getUserCart(user.token)
    .then(res => {
      // console.log('user cart res', JSON.stringify(res, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    })
  };

  const emptyCart = () => {
    let answer = window.confirm("Are you sure you want to empty your cart?");
    if (answer) {
      // remove from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
      }
      // remove from redux
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      })
      // remove from backend
      emptyUserCart(user.token)
      .then(res => {
        setProducts([]);
        setTotal(0);
        setTotalAfterDiscount(0);
        setCoupon('');
        toast.success("Cart is empty. Continue Shopping.");
      })
    }
  };

  const saveAddressToDb = (e) => {
    e.preventDefault();
    // console.log("saveAddressToDb --> ", address);
    saveUserAddress(user.token, address)
    .then(res => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved");
      }
    })
  };

  const handleAddressChange = (e) => {
    e.preventDefault();
    setAddress({ ...address, [e.target.name]: e.target.value });
    // console.log("handleAddressChange --> ", address);
  }

  const showOrderSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "} 
          ${numberFormat(p.product.price * p.count)}
        </p>
      </div>
    ))
  };

  const applyDiscountCoupon = () => {
    console.log('send coupon to backend', coupon);
    applyCoupon(user.token, coupon)
    .then (res => {
      console.log("res on coupon applied", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon allpied true or false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
        toast.success(`Coupon "${coupon.toUpperCase()}" applied`);
      } 

      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon allpied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        toast.error(res.data.err);
      }
    })
  };

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
        }}
        value={coupon}
        type="text"
        className="form-control"
        style={{ width: "90%", margin: "auto"}}
      />
      <button 
        className="btn btn-primary mt-2"
        onClick={applyDiscountCoupon}
      >
        Apply
      </button>
    </>
  )

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse)
    .then(res => {
      console.log("USER COD RES", res);
      // empty cart from redux, localStorage, 
      // reset coupon, reset COD, reidrect to history page
      if (res.data.ok) {
        // empty localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart');
        };
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        //empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // empty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push('/user/history');
        }, 1000);
      }
    })
  };
  
  return (
    <div className="row pt-2 mt-3">
      <div className="col-md-4">
        <h4 className="text-center">Delivery Address</h4>
        <br />
        <AddressForm
          handleAddressChange={handleAddressChange}
          address={address}
          setAddress={setAddress}
          saveAddressToDb={saveAddressToDb}
        />
        <hr />
      </div>

      <div className="col-md-4 text-center">
        <h4 className="pb-1">Got Coupon?</h4>
          <br />
          <br />
          {showApplyCoupon()}
          <br/>
      </div>

      <div className="col-md-4">
        <h4 className="text-center">Order Summary</h4>
        <hr />
        <p>Products: {products.length}</p>
        <hr />
        {showOrderSummary()}
        <hr />
        <p>Cart Total: ${numberFormat(total)}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success text-light p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button 
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                  Place Order
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
              >
                <Link to="/payment" disabled={!addressSaved || !products.length}>
                  Place Order
                </Link>
              </button>
            )}
          </div>
          
          <div className="col-md-6">
            <button 
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
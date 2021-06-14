import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import {
  getCoupons,
  removeCoupon,
  createCoupon
} from '../../../functions/coupon';
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => {
    getCoupons().then(res => setCoupons(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, discount, expiry);
    createCoupon(user.token, { name, expiry, discount})
    .then (res => {
      setLoading(false);
      loadAllCoupons();
      setName('');
      setExpiry('');
      setDiscount('');
      toast.success(`"${res.data.name}" is created`)
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
      toast.error("Coupon was not created");
    })
  }

  const handleNameChange = (e) => {
    if (e.target.value.length > 32) {
      toast.error("Name is too long. Max length is 32 characters");
    } else {
      setName(e.target.value);
    }
  };

  const handleDiscountChange = (e) => {
    if (e.target.value < 0) {
      toast.error("Discount must be greater than 0");
    } else if (e.target.value > 99) {
      toast.error("Discount must be less than 100");
    } else {
      setDiscount(Number.parseInt(e.target.value));
      // console.log('discount', discount);
    }
  };

  const handleRemove = (couponId) => {
    if (window.confirm('Delete Coupon?')) {
      setLoading(true);
      removeCoupon(user.token, couponId)
      .then(res => {
        loadAllCoupons();
        setLoading(false);
        toast.error(`Coupon "${res.data.name}" deleted`);
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 mt-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">
                Name
              </label>
              <input 
                type="text"
                className="form-control"
                onChange={handleNameChange}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                Discount %
              </label>
              <input 
                type="text"
                className="form-control"
                onChange={handleDiscountChange}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">
                Expiry
              </label>
              <br />
              <DatePicker 
                className="form-control" 
                onChange={date => setExpiry(date)}
                value={expiry}
                selected={expiry}
                required
              />
            </div>

            <button className="btn btn-outline-primary">
              Save
            </button>
          </form>

          <br />

          {coupons.length === 1 ? (
            <h4>1 Coupon</h4>
          ) : (
            <h4>{coupons.length} Coupons</h4>
          )}
          <table className="table table-borderer">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}</td>
                  <td>
                    <DeleteOutlined 
                      className="text-danger pointer"
                      onClick={() => handleRemove(c._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default CreateCouponPage;
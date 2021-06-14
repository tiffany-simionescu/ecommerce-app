import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getWishlist, removeWishlist } from '../../functions/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
    console.log("ONLOAD WISHLIST", wishlist);
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token)
    .then(res => {
      console.log("loadWishlist", res.data.wishlist);
      setWishlist(res.data.wishlist);
    });
  };

  const handleRemove = (productId) => {
    if (window.confirm('Remove from wishlist?')) {
      removeWishlist(user.token, productId)
      .then(res => {
        loadWishlist();
        toast.error("Removed from wishlist")
      })
    };
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col mt-3">
          <h4>Wishlist</h4>

          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span 
                onClick={() => handleRemove(p._id)} 
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
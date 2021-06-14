import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeaturesNav from '../components/nav/FeaturesNav';
import { useDispatch } from 'react-redux';

const Features = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "UPDATED_PRODUCT", 
      payload: '',
    });
  }, []);

  return (
    <div className="container-fluid pr-5">
    <div className="row">
      <div className="col-md-2">
        <FeaturesNav />
      </div>
    
      <div className="col-md-10 mt-3">
        <h4>App Features</h4>
        <p>
          Please select <Link to="/features/admin">Admin Features</Link> to learn more 
          about what the Admin can accomplish in their dashboard.
        </p>
        <p>
          If you prefer to not register a new User account, please 
          select <Link to="/features/user">User Features</Link> to learn more about what the User 
          can view in their dashboard.
        </p>
      </div>
    </div>
  </div>
  )
};

export default Features;
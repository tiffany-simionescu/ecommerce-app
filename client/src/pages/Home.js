import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';
import violin from '../images/hero-violin.jpeg';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "UPDATED_PRODUCT", 
      payload: '',
    });
  }, []);

  return (
    <>
    <div className="hero-container">
      <img 
        className="hero-img"
        src={violin}
        alt="Hero-image" 
      />
      <div className="h1 font-weight-bold text-center hero-text">
        <span className="h1 font-weight-bold text-center">Welcome. We have
        <Jumbotron text={[' the Latest Products', ' New Arrivals', ' Best Sellers']} />
        </span>
      </div>
    </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {  createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const initialState = {
  title: 'Violin',
  description: 'This is the best violin product',
  price: '4500',
  categories: [],
  category: '',
  subs: [],
  shipping: 'Yes',
  quantity: '50',
  images: [],
  colors: ["Yellow", "Amber", "Golden Yellow", "Golden Brown", 
    "Red", "Red Brown", "Brown", "Dark Brown"],
  brands: ["Cecilio", "DZ Strad", "Mendini", "Kennedy Violins", 
    "D'Addario", "Core"],
  color: 'Red Brown',
  brand: 'Cecilio',
  sizes: ["4/4", "3/4", "1/2", "1/4", "1/8", 
  "1/10", "1/16", "16.5", "16", "15.5", 
  "15", "14", "13", "12"]
}

const ProductCreate = ({ history }) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state })); 

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
    .then(res => {
      console.log(res);
      window.alert(`${res.data.title} was created`);
      history.push('/admin/products');
    })
    .catch(err => {
      console.log(err);
      toast.error("That title already exists");
    })

  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value)
    .then(res => {
      console.log('SUB OPTIONS ON CATEGORY CLICKED', res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10 mt-3">
          {loading ? (
            <LoadingOutlined className="text-danger h1"/>
          ) : (
            <h4>Create Product</h4>
          )}
          <hr />

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values} 
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCreate;
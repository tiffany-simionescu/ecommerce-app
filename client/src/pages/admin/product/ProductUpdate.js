import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ["Yellow", "Amber", "Golden Yellow", "Golden Brown", 
    "Red", "Red Brown", "Brown", "Dark Brown"],
  brands: ["Cecilio", "DZ Strad", "Mendini", "Kennedy Violins", 
    "D'Addario", "Core"],
  color: '',
  brand: '',
  sizes: ["4/4", "3/4", "1/2", "1/4", "1/8", 
  "1/10", "1/16", "16.5", "16", "15.5", 
  "15", "14", "13", "12"],
  size: '',
}

const ProductUpdate = ({ match, history }) => {
  // state 
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // put the currently selected category in a new state
  // can now compare to initialState, and restore initialState,
  // instead of updating initialState right away.
  const [selectedCategory, setSelectedCategory] = useState("");

  // redux
  const { user } = useSelector((state) => ({ ...state })); 
  // router
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, [])

  const loadProduct = () => {
    getProduct(slug)
    .then(p => {
      // console.log('Single product', p);
      // 1. load single product
      setValues({ ...values, ...p.data });
      // 2. load single product category subs
      getCategorySubs(p.data.category._id)
      .then(res => {
        setSubOptions(res.data); // on first load, show default subs
      });
      // 3. prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      p.data.subs.map(s => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs(prev => arr); // required for antd select to work
    })
  };

  const loadCategories = () => {
    getCategories()
    .then(c => {
      console.log('GET CATEGORIES IN UPDATE PRODUCT', c.data);
      setCategories(c.data);
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(user.token, slug, values)
    .then(res => {
      setLoading(false);
      toast.success(`${res.data.title} was updated`);
      history.push('/admin/products');
    })
    .catch(err => {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data.err);
    })
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value)
    .then(res => {
      console.log("SUB OPTIONS ON CATEGORY CLICK", res);
      setSubOptions(res.data);
    });

    console.log("EXISTING CATEGOIRES values.category", values.category)

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids 
    setArrayOfSubs([]);
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10 mt-3">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Update Product</h4>
          )}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm 
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            setValue={setValues}
            values={values}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate;
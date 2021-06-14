import React, { useEffect, useState } from 'react';
import { 
  getProductsByCount, 
  fetchProductsByFilter,
} from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import Star from '../components/forms/Star';

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [brands, setBrands] = useState([
    "Cecilio", "DZ Strad", "Mendini", "Kennedy Violins", 
    "D'Addario", "Core"
  ]);
  const [brand, setBrand] = useState('');
  const [colors, setColors] = useState([
    "Yellow", "Amber", "Golden Yellow", "Golden Brown", 
    "Red", "Red Brown", "Brown", "Dark Brown"
  ]);
  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');
  const [sizes, setSizes] = useState([
    "4/4", "3/4", "1/2", "1/4", "1/8", 
    "1/10", "1/16", "16.5", "16", "15.5", 
    "15", "14", "13", "12"
  ]);
  const [size, setSize] = useState('');


  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  let searchList = [];

  useEffect(() => {
    // fetch categories
    getCategories().then(res => setCategories(res.data));
    // fetch sub categories
    getSubs().then(res => setSubs(res.data));
  }, []);

  useEffect(() => {
    dispatch({
      type: "UPDATED_PRODUCT", 
      payload: '',
    });
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      // console.log('fetchProductsByFilter', res.data);
      setProducts(res.data);
    });
    searchList.push(products);
    setProducts(searchList[0]);
  };

  // 1. Load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then(res => {
      setProducts(res.data);
      setLoading(false);
      setCategoryIds([]);
      setPrice([0, 0]);
      setStar('')
      setSub('');
      setBrand('');
      setColor('');
      setShipping('');
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    // console.log('load products on user search input', text);
    const delayed = setTimeout(() => {
      fetchProducts({  query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    searchList.push(products);
    setProducts(searchList[0]);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log('ok torequest');
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok)
    }, 300);
  }

  // 4. load products based on category
  // show categories in a list of checkboxes
  const showCategories = () => 
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox 
          onChange={handleCheck} 
          className="pb-2 pl-4 pr-4" 
          value={c._id} name="category"
          checked={categoriesIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    let inTheState = [...categoriesIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked) // true or -1

    // if not found, returns -1, else returns index
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState })
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    setStar(num);
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  )

  // Sizes
  const handleSize = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    setSize(e.target.value);
    fetchProducts({ size: e.target.value });
  };

  const showSizes = () => 
  sizes.map((s) => (
    <Checkbox 
      onChange={handleSize} 
      className="pb-1 pl-2 pr-5 size-checkbox" 
      key={s}
      value={s} 
      name={s} 
      checked={s === size} 
    >
      {s}
    </Checkbox>
  ));

  // 6. show products by sub category
  const handleSub = (sub) => {
    // console.log("handleSub --> ", s);
    setSub(sub)
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    fetchProducts({ sub });
  };

  const showSubs = () => 
    subs.map((s) => (
      <div 
        key={s._id}
        onClick={() => handleSub(s)} 
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  // 7. show products based on brand name
  const handleBrand = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  };

  const showBrands = () => 
  brands.map((b) => (
    <Radio 
      key={b}
      value={b} 
      name={b} 
      checked={b === brand} 
      onChange={handleBrand} 
      className="pb-1 pl-5 pr-5" 
    >
      {b}
    </Radio>
  ));

  // 8. show products based on color
  const handleColor = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    setColor(e.target.value)
    fetchProducts({ color: e.target.value });
  };

  const showColors = () => 
  colors.map((c) => (
    <Radio 
      key={c}
      value={c} 
      name={c} 
      checked={c === color} 
      onChange={handleColor} 
      className="pb-1 pl-5 pr-5" 
    >
      {c}
    </Radio>
  ));

  // 9. show products based on shipping
  const handleShipping = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    setShipping(e.target.value)
    fetchProducts({ shipping: e.target.value });
  };

  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-5 pr-5"
        onChange={handleShipping}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>
      <br />
      <Checkbox
        className="pb-2 pt-1 pl-5 pr-5"
        onChange={handleShipping}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  )

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-3 pt-2" style={{ minWidth: "200px" }}>
          <h4>Search/Filter</h4>
          <button 
            className="btn btn-primary btn-raised pointer"
            onClick={loadAllProducts}
          >
            Clear Search
          </button>
          <hr />

          <Menu 
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7', '8']} 
            mode="inline"
          >
            {/* Price */}
            <SubMenu key="1" title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider 
                  className="ml-4 mr-4" 
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="5000"
                />
              </div>
            </SubMenu>

            {/* Category */}
            <SubMenu key="2" title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px", marginLeft: "15px" }}>
                {showCategories()}
              </div>
            </SubMenu>

            {/* Stars */}
            <SubMenu key="3" title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ marginTop: "-10px", marginLeft: "5px" }}>
                {showStars()}
              </div>
            </SubMenu>

            {/* Sizes */}
            <SubMenu key="4" title={
                <span className="h6">
                  <DownSquareOutlined /> Sizes
                </span>
              }
            >
              <div style={{ marginTop: "-10px", marginLeft: "15px" }}>
                {showSizes()}
              </div>
            </SubMenu>

            {/* Sub Category */}
            <SubMenu key="5" title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px", marginLeft: "5px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            {/* Brands */}
            <SubMenu key="6" title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div 
                style={{ marginTop: "-10px", marginLeft: "-15px" }} 
                className="pr-5"
              >
                {showBrands()}
              </div>
            </SubMenu>

            {/* Colors */}
            <SubMenu key="7" title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div 
                style={{ marginTop: "-10px", marginLeft: "-15px" }} 
                className="pr-5"
              >
                {showColors()}
              </div>
            </SubMenu>

            {/* Shipping */}
            <SubMenu key="8" title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div 
                style={{ marginTop: "-10px", marginLeft: "-15px" }} 
                className="pr-5"
              >
                {showShipping()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No Products Found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} key={p._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
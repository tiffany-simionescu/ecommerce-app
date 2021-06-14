import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  createCategory,
  getCategories,
  removeCategory
 } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // Step 1 - Search Bar
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, [])

  const loadCategories = () => 
    getCategories().then(c => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    createCategory(user.token, { name })
    .then(res => {
      setLoading(false)
      setName('');
      toast.success(`The category ${res.data.name} was created`);
      loadCategories();
    })
    .catch(err => {
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    })
  }

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true)
      removeCategory(user.token, slug)
      .then(res => {
        setLoading(false);
        toast.error(`${res.data.name} deleted.`)
        loadCategories();
      })
      .catch(err => {
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
    }
  };

  // Step 4 - Search Bar
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col mt-3">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <h4>Create Category</h4>
        )}

        <CategoryForm 
          handleSubmit={handleSubmit} 
          name={name} 
          setName={setName} 
        />

        {/* Step 2 and 3 - Search Bar */}
        <LocalSearch 
          keyword={keyword} 
          setKeyword={setKeyword}
        />

        {/* Step 5 - Search Bar */}
        {categories.filter(searched(keyword)).map((c) => (
          <div className="alert alert-secondary" key={c._id}>
            {c.name}{" "} 
            <span 
              onClick={() => handleRemove(c.slug)} 
              className="btn btn-sm float-right"
            >
              <DeleteOutlined className="text-danger" />
            </span>
            <Link to={`/admin/category/${c.slug}`}>
              <span className="btn btn-sm float-right">
                <EditOutlined className="text-warning" />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default CategoryCreate;
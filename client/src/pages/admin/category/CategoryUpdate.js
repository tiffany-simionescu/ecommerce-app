import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';
import CategoryFrom from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector(state => ({ ...state }));

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, [])

  const loadCategory = () => 
    getCategory(match.params.slug).then(c => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    updateCategory(user.token, match.params.slug, { name })
    .then(res => {
      setLoading(false)
      setName('');
      toast.success(`The category ${res.data.name} was updated`);
      history.push('/admin/category');
    })
    .catch(err => {
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    })
  };

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
          <h4>Update Category</h4>
        )}
        
        <CategoryFrom
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}   
        />

        <hr />
      </div>
    </div>
  </div>
  );
};

export default CategoryUpdate;
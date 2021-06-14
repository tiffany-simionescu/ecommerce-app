import React, { useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const AdminPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await auth.currentUser.updatePassword(password)
    .then(() => {
      setLoading(false);
      setPassword('');
      toast.success('Password updated')
    })
    .catch(err => {
      setLoading(false);
      toast.error(err.message);
    })
  }

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>New Password</label>
        <input 
          type="password" 
          onChange={e => setPassword(e.target.value)} 
          className="form-control" 
          placeholder="Enter newpassword"
          disabled={loading}
          value={password}
        />
        <button 
          className="btn btn-primary" 
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  
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
            <h4>Password Update</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default AdminPassword;
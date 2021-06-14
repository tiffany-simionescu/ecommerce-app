import React from 'react';

const AddressForm = ({ handleAddressChange, address, saveAddressToDb }) => {
  const { name, street, apt, city, state, postalCode, country } = address;

  return (
    <form style={{ marginLeft: "30px", margin: "auto", width: "90%" }}>
      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          className="form-control" 
          value={name} 
          onChange={handleAddressChange} 
        />
      </div>

      <div className="form-group">
        <label>Street</label>
        <input 
          type="text" 
          name="street" 
          className="form-control" 
          value={street} 
          onChange={handleAddressChange} 
        />
      </div>

      <div className="form-group">
        <label>Apt.</label>
        <input 
          type="text" 
          name="apt" 
          className="form-control" 
          value={apt} 
          onChange={handleAddressChange} 
        />
      </div>

      <div className="form-group">
        <label>City</label>
        <input 
          type="text" 
          name="city" 
          className="form-control" 
          value={city} 
          onChange={handleAddressChange} 
        />
      </div>

      <div className="form-group">
        <label>State</label>
        <input 
          type="text" 
          name="state" 
          className="form-control" 
          value={state} 
          onChange={handleAddressChange} 
        />
      </div>

      <div className="form-group">
        <label>Postal Code</label>
        <input 
          type="number" 
          name="postalCode" 
          className="form-control" 
          value={postalCode} 
          onChange={handleAddressChange} 
        />
      </div>

      <div className="form-group">
        <label>Country</label>
        <input 
          type="text" 
          name="country" 
          className="form-control" 
          value={country} 
          onChange={handleAddressChange} 
        />
      </div>
      
        <button 
          className="btn btn-primary btn-raised mt-2"
          onClick={saveAddressToDb}
        >
          Save
        </button>
    </form>
  );
};

export default AddressForm;
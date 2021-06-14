import React from 'react';
import { numberFormat } from '../../functions/product';
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  CloseOutlined 
} from '@ant-design/icons';

const ProductCardInCheckout = ({ product }) => {
  const colors = [
    "Yellow", "Amber", "Golden Yellow", "Golden Brown", 
    "Red", "Red Brown", "Brown", "Dark Brown"
  ];
  const sizes = [
    "4/4", "3/4", "1/2", "1/4", "1/8", 
    "1/10", "1/16", "16.5", "16", "15.5", 
    "15", "14", "13", "12"
  ];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log('color change', e.target.value);

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((p, i) => {
        if (p._id === product._id) {
          cart[i].color = e.target.value;
        }
      });
      // console.log('cart update color', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    };
  };

  const handleSizeChange = (e) => {
    console.log('size change', e.target.value);

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((p, i) => {
        if (p._id === product._id) {
          cart[i].size = e.target.value;
        }
      });
      // console.log('cart update color', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    };
  };

  const handleQuantityChange = (e) => {
    // console.log('available quantity', product.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > product.quantity) {
      toast.error(`Max available quantity for ${product.title}: ${product.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((p, i) => {
        if (p._id == product._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    };
  };

  const handleRemove = () => {
    // console.log('remove', product._id);
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((p, i) => {
        if (p._id === product._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    };
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {product.images.length ? (
              <ModalImage 
                small={product.images[0].url}
                large={product.images[0].url}
              />
            ) : (
              <ModalImage 
                small={laptop}
                large={laptop}
              />
            )}
          </div>
        </td>
        <td>{product.title}</td>
        <td>${numberFormat(product.price)}</td>
        <td>{product.brand}</td>
        <td>
          <select 
            onChange={handleSizeChange} 
            name="size" 
            className="form-control"
          >
            {product.size ? (
              <option value={product.size}>
                {product.size}
              </option>
            ) : (
              <option>Select</option>
            )}

            {sizes
              .filter((s) => s !== product.size)
              .map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
            ))}
          </select>
        </td>
        <td>
          <select 
            onChange={handleColorChange} 
            name="color" 
            className="form-control"
          >
            {product.color ? (
              <option value={product.color}>
                {product.color}
              </option>
            ) : (
              <option>Select</option>
            )}

            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
            ))}
          </select>
        </td>
        <td style={{ width: "50px" }} className="text-center">
          <input
            type="number"
            className="form-control text-center"
            value={product.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td className="text-center">
          {product.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined 
            onClick={handleRemove}
            className="text-danger pointer" 
          />
        </td>
      </tr>
    </tbody>
  )
};

export default ProductCardInCheckout;
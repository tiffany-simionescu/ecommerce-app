import React from "react";
import { Link } from "react-router-dom";
import { numberFormat } from '../../functions/product';

const ProductListItems = ({ 
  product, 
  pastProduct,
  colors,
  sizes,
  handleColorChange, 
  handleQuantityChange, 
  handleSizeChange 
}) => {
  const {
    price,
    category,
    subs,
    shipping,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          {numberFormat(price)}
        </span>
      </li>

   <li className="list-group-item">
        Quantity{" "}
        <span className="label label-default label-pill pull-xs-right">
          <input
            type="number"
            className="form-control text-center"
            defaultValue={pastProduct && pastProduct.count ? pastProduct.count : 1}
            value={product.count}
            onChange={handleQuantityChange}
          />
        </span>
      </li>   

      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Categories
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Size{" "}
        <span className="label label-default label-pill pull-xs-right">
          <select 
            onChange={handleSizeChange} 
            name="size" 
            className="form-control"
          >
            {pastProduct && pastProduct.size ? (
              <option value={pastProduct.size}>
                {pastProduct.size}
              </option>
            ) : (
              product.size ? (
                <option value={product.size}>
                {product.size}
              </option>
              ) : (
              <option>Select</option>
            ))}

            {sizes
              .filter((s) => s !== product.size)
              .map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
            ))}
          </select>
        </span>
      </li>

      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill pull-xs-right">
          {/* {color} */}
          <select 
            onChange={handleColorChange} 
            name="color" 
            className="form-control"
          >
            {pastProduct && pastProduct.color ? (
              <option value={pastProduct.color}>
                {pastProduct.color}
              </option>
            ) : (
              product.color ? (
                <option value={product.color}>
                {product.color}
              </option>
              ) : (
              <option>Select</option>
            ))}

            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
            ))}
          </select>
        </span>
      </li>

      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;

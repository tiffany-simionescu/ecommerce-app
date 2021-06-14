# E-Commerce Website

## Project Overview
This Ecommerce application was built using the MERN stack (MongoDB, Express.js, React, Node.js). In the frontend (client directory), ant-design and bootstrap are used for the design elements, Redux for state management, Stripe for payment processing (as well as the ability to pay via COD), and firebase for authentication and security (functionality to login with a Google account). When searching for available products, users have the ability to apply mutiple search filters to narrow down product selections.

### Install
```
cd client
npm install
```

### Run App
```
cd client
npm start
```

### Frontend - Environmental Variables
- Create a dotenv file containing the following environmental variables:
  - REACT_APP_API_KEY
  - REACT_APP_AUTH_DOMAIN
  - REACT_APP_PROJECT_ID
  - REACT_APP_STORAGE_BUCKET
  - REACT_APP_MESSAGING_SENDER_ID
  - REACT_APP_APP_ID
  - REACT_APP_REGISTER_REDIRECT_URL
  - REACT_APP_FORGOT_PASSWORD_REDIRECT
  - REACT_APP_API
  - REACT_APP_STRIPE_KEY

- Payments will be processed using Stripe (https://stripe.com/). After creating an account, go to Developers > API Keys. The Publishable Key is needed for the frontend (REACT_APP_STRIPE_KEY).

## API Documentation
The API uses Node.js, Express.js, Mongoose.js, and MongoDB for the database. The middleware used is Morgan, bodyParser, and cors. Firebase is being used for token validation.

### Install
```
cd server
npm install
```
### Run API
```
cd server
npm start
```
### API - Environmental Variables
- Create a dotenv file containing the following environmental variables:
  - DATABASE
  - PORT
  - CLOUDINARY_CLOUD_NAME
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET
  - STRIPE_SECRET
  
- Create a file called `fbServiceAccountKey.json` in the config directory. The information needed for this file can be found by going to the console in Firebase, selecting the newly created project, Clicking on the gear icon in the upper left-hand corner of the screen (right next to Project Overview), and clicking on Project Settings, than Service Accounts, Generate a New Key, and save the file to/as server > config > fbServiceAccountKey.json.
- To learn how to create a new project in Firebase, please visit https://firebase.google.com/. 

- Payments will be processed using Stripe (https://stripe.com/). After creating an account, go to Developers > API Keys. The secret key is needed for the API (STRIPE_SECRET).


## Routes
### Admin Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/api/admin/orders` | admin      | Returns all orders from users. |
| PUT    | `/api/admin/order-status` | admin        | Updates order status. |

### Auth Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/create-or-update-user` | user      | Creates or updates a user. |
| POST    | `/api/current-user` | user        | Verifies current user. |
| POST    | `/api//current-admin` | admin        | Verifies current admin.|

### Category Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/category` | admin      | Creates a new category. |
| GET    | `/api/categories` | user        | Returns all categories. |
| GET    | `/api/category/:slug` | user        | Returns a category.|
| GET    | `/api/category/subs/:_id` | user        | Returns all subcategories of a category.|
| PUT    | `/api/category/:slug` | admin      | Updates a category. |
| DELETE    | `/api/category/:slug` | admin        | Removes a category. |

### Cloudinary Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/uploadimages` | admin      | Creates a new image. |
| POST    | `/api/removeimage` | admin        | Removes an image. |

### Coupon Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/coupon` | admin      | Creates a coupon. |
| GET    | `/api/coupons` | user        | Returns all coupons. |
| DELETE    | `/api/coupon/:couponId` | admin        | Removes a coupon. |

### Product Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/product` | admin      | Creates a product. |
| POST    | `/api/products` | user        | List products. |
| POST    | `/api/search/filters` | user        | Filters through products. |
| GET    | `/api/products/total` | user      | Returns total value in user's cart. |
| GET    | `/api/products/:count` | user        | Returns the count of all products. |
| GET    | `/api/product/:slug` | user        | Returns a product. |
| GET    | `/api/product/related/:productId` | user    | Returns related products of a product. |
| PUT    | `/api/product/:slug` | admin        | Updates a product. |
| PUT    | `/api/product/star/:productId` | user        | Updates the star rating of a product. |
| DELETE    | `/api/product/:slug` | admin        | Removes a product. |

### Stripe Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/create-payment-intent` | user      | Creates a payment intent. |

### Sub Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/sub` | admin      | Creates a subcategory. |
| GET    | `/api/subs` | user      | Returns all subcategories. |
| GET    | `/api/sub/:slug` | user      | Returns a subcategory. |
| PUT    | `/api/sub/:slug` | admin      | Updates a subcategory. |
| DELETE    | `/api/sub/:slug` | admin      | Removes a subcategory. |

### User Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| POST    | `/api/user/cart` | user      | Adds product to user's cart. |
| POST    | `/api/user/address` | user      | Adds or updates user's address. |
| POST    | `/api/user/cart/coupon` | user      | Adds a coupon to user's cart total. |
| POST    | `/api/user/order` | user      | Creates a new order. |
| POST    | `/api/user/cash-order` | user      | Creates a new COD order. |
| POST    | `/api/user/wishlist` | user      | Adds a product to user's wishlist. |
| GET    | `/api/user/cart` | user      | Returns user's cart. |
| GET    | `/api/user/address` | user      | Returns user's address. |
| GET    | `/api/user/orders` | user      | Returns user's orders. |
| GET    | `/api/user/widhlist` | user      | Returns user's wishlist. |
| PUT    | `/api/user/wishlist/:productId` | user      | Removes a product from user's wishlist. |
| DELETE    | `/api/user/cart` | user      | Removes products from user's cart. |

## Data Models

### Cart Model
```
{
  products: [
    {
      product: {
        type: ObjectId,
        ref: 'Product'
      },
      count: Number,
      color: String,
      price: Number
    },
  ],
  cartTotal: Float,
  totalAfterDiscount: Float,
  orderedBy: { 
    type: ObjectId, 
    ref: "User" 
  }
}
```

### Category Model
```
{
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    minlength: [2, 'Too short'],
    maxlength: [32, 'Too long'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
}
```

### Coupon Model
```
{
  name: {
    type: String,
    trim: true,
    unique: true,
    uppercase: true,
    required: 'Name is required',
    minlength: [2, "Too short"],
    maxlength: [32, "Too long"],
  },
  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
}
```

### Order Model
```
{
  products: [
    {
      product: {
        type: ObjectId,
        ref: "Product",
      },
      count: Number,
      color: String,
    },
  ],
  paymentIntent: {},
  orderStatus: {
    type: String,
    default: 'Not Processed',
    enum: [
      "Not Processed",
      "Cash On Delivery",
      "Processing",
      "Dispatched",
      "Cancelled",
      "Completed",
    ],
  },
  orderedBy: { 
    type: ObjectId, 
    ref: "User" 
  },
}
```

### Product Model
```
{
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    text: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    text: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32,
  },
  category: {
    type: ObjectId,
    ref: "Category",
  },
  subs: [
    {
      type: ObjectId,
      ref: "Sub",
    },
  ],
  quantity: Number,
  sold: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
  },
  shipping: {
    type: String,
    enum: ["Yes", "No"],
  },
  color: {
    type: String,
    enum: ["Yellow", "Amber", "Golden Yellow", "Golden Brown", "Red", "Red Brown", "Brown", "Dark Brown"],
  },
  brand: {
    type: String,
    enum: ["Cecilio", "DZ Strad", "Mendini", "Kennedy Violins", "D'Addario", "Core"],
  },
  ratings: [
    {
      star: Number,
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
}
```
### Sub Model
```
{
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    minlength: [2, 'Too short'],
    maxlength: [32, 'Too long'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  parent: {
    type: ObjectId,
    ref: "Category",
    required: true,
  }
}
```

### User Model
```
{
  name: String,
  email: {
    type: String,
    required: true, 
    index: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  cart: {
    type: Array,
    default: [],
  },
  // address: String,
  address: [
    {
      name: {
        type: String,
        required: true,
        maxlength: [32, 'Must be no more than 32 characters long'],
        minlength: [2, 'Must be at least 2 characters long'],
      },
      street: {
        type: String, 
        required: true
      },
      apt: { 
        type: String 
      },
      city: { 
        type: String, 
        required: true 
      },
      state: { 
        type: String, 
        required: true 
      },
      postalCode: { 
        type: Number, 
        required: true, 
        maxlength: [5, 'Must be 5 numbers'], 
        minlength: [5, 'Must be 5 numbers'],
      },
      country: { 
        type: String, 
        required: true,
        maxlength: [32, 'Must be no more than 32 characters long'],
        minlength: [2, 'Must be at least 2 characters long'],
      },
      postedBy: { 
        type: ObjectId, 
        ref: "User" 
      },
    },
  ],
  wishlist: [{type: ObjectId, ref: "Product"}],
}
```
## Controllers

### Admin Controllers
`orders()` -> Returns all orders from users.

`orderStatus()` -> Updates order status.


### Auth Controllers
`createOrUpdateUser()` -> Creates or updates a user's information.

`currentUser()` -> Verifies the current user.


### Category Controllers
`create()` -> Creates a new category.

`list()` -> Returns all categories.

`read()` -> Returns products in category.

`update()` -> Updates a category.

`remove()` -> Removes a category.

`getSubs()` -> Returns the subcategories for a category.


### Cloudinary Controllers
`upload()` -> Uploads an image to cloudinary.

`remove()` -> Removes an image from cloudinary.


### Coupon Controllers
`create()` -> Creates a coupon.

`list()` -> Returns all coupons.

`remove()` -> Removes a coupon.


### Product Controllers
`create()` -> Creates a product.

`listAll()` -> Returns all products.

`list()` -> Returns all products with pagination.

`read()` -> Returns a product.

`productsCount()` -> Returns the count of all products.

`listRelated()` -> Returns related products of a product.

`update()` -> Updates a product.

`productStar()` -> Updates star rating.

`remove()` -> Removes a product.

`searchFilters()` -> Handles product search filters (Query, Price, Category, Stars, Subcategory, Shipping, Color, Brand).


### Stripe Controllers
`createPaymentIntent()` -> Creates a payment intent.


### Sub Controllers
`create()` -> Creates a subcategory.

`list()` -> Returns all subcategories.

`update()` -> Updates a subcategory.

`remove()` -> Removes a subcategory.


### User Controllers
`userCart()` -> Creates a user cart.

`createOrder()` -> Creates a new order.

`createCashOrder()` -> Creates a payment intent for COD orders.

`addToWishlist()` -> Adds product to a user's wishlist.

`getUserCart()` -> Returns a user's cart.

`getUserAddress()` -> Returns a user's address.

`orders()` -> Returns a user's orders.

`wishlist()` -> Returns a user's wishlist.

`saveAddress()` -> Updates a user's address.

`applyCouponToUserCart()` -> Update user's cart value with coupon.

`emptyCart()` -> Removes user's cart.

`removeFromWishlist()` -> Removes product from a user's wishlist.
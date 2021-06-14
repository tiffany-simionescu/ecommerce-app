import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './functions/auth'; 
import { LoadingOutlined } from '@ant-design/icons';

// components/drawer
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'));

// components/nav
const Header = lazy(() => import('./components/nav/Header'));

// pages
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Features = lazy(() => import('./pages/Features'));
const Home = lazy(() => import('./pages/Home'));
const Payment = lazy(() => import('./pages/Payment'));
const Product = lazy(() => import('./pages/Product'));
const Shop = lazy(() => import('./pages/Shop'));

// pages/admin
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminPassword = lazy(() => import('./pages/admin/AdminPassword'));
const CategoryCreate = lazy(() => import('./pages/admin/category/CategoryCreate'));
const CategoryUpdate = lazy(() => import('./pages/admin/category/CategoryUpdate'));
const CreateCouponPage = lazy(() => import('./pages/admin/coupon/CreateCouponPage'));
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'));
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'));
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'));
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'));

// pages/auth
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));

// pages/category
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'));

// pages/features
const AdminFeatures = lazy(() => import('./pages/features/AdminFeatures'));
const UserFeatures = lazy(() => import('./pages/features/UserFeatures'));

// pages/sub
const SubHome = lazy(() => import('./pages/sub/SubHome'));

// pages/user
const History = lazy(() => import('./pages/user/History'));
const UserPassword = lazy(() => import('./pages/user/UserPassword'));
const Wishlist = lazy(() => import('./pages/user/Wishlist'));

const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("User", user);
        
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch(err => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={
      <div className="col text-center p-5">
        Ecommerce App <LoadingOutlined />
      </div>
    }>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Switch>

        {/* Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/features" component={Features} />
        <Route exact path="/features/admin" component={AdminFeatures} />
        <Route exact path="/features/user" component={UserFeatures} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/sub/:slug" component={SubHome} />

        {/* User Routes */}
        <UserRoute exact path="/checkout" component={Checkout} />
        <UserRoute exact path="/payment" component={Payment} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={UserPassword} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />

        {/* Admin Routes */}
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/password" component={AdminPassword} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
      </Switch>
    </Suspense>
  );
};

export default App;

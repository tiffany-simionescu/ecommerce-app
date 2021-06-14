import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';
import { couponReducer } from './couponReducer';
import { CODReducer } from './CODReducer';
import { productReducer } from './productReducer';
import { pastProductReducer } from './pastProductReducer';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  pastProduct: pastProductReducer,
  product: productReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  COD: CODReducer,
});

export default rootReducer;
let initialState = {};

// load cart items from localStorage
if (typeof window !== 'undefined') {
  if (localStorage.getItem('product')) {
    initialState = JSON.parse(localStorage.getItem('product'));
  } else {
    initialState = {};
  }
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATED_PRODUCT":
      return action.payload;
    default:
      return state;
  };
};  
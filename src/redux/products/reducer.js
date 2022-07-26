import {SET_PRODUCTS} from './constants';

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload.filter((product) => !!product.quantity),
      };
    default:
      return state;
  }
};

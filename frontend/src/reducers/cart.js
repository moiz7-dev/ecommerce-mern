import { ADD_TO_CART } from "../constants/cart";

export const product = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = payload.action;

      const isItemExists = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};

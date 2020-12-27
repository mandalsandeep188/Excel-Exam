export const inUser = null;

export const userReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return action.payload;
  } else if (action.type === "LOGOUT") {
    return inUser;
  }
  return state;
};

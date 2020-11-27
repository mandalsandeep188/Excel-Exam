export const inState = null;

export const reducer = (state, action) => {
  if (action.type === "TEST") {
    return action.payload;
  } else if (action.type === "PRACTICE") {
    return state;
  } else if (action.type === "SUBMIT") {
    return inState;
  }
  return state;
};

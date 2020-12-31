import React, { createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./components/Routing";
import { inState, reducer } from "./reducers/testReducer";
import { inUser, userReducer } from "./reducers/userReducer";

export const QuestionContext = createContext();
export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, inState);
  const [user, changeUser] = useReducer(userReducer, inUser);
  return (
    <UserContext.Provider value={{ user, changeUser }}>
      <QuestionContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </QuestionContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

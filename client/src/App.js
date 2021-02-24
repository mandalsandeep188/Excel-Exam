import React, { createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./components/Routing";
import { inState, reducer } from "./reducers/testReducer";
import { inUser, userReducer } from "./reducers/userReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <ToastContainer position="bottom-right" />
          <div className="light x1"></div>
          <div className="light x2"></div>
          <div className="light x3"></div>
          <div className="light x4"></div>
          <div className="light x5"></div>
          <div className="light x6"></div>
          <div className="light x7"></div>
          <div className="light x8"></div>
          <div className="light x9"></div>
        </BrowserRouter>
      </QuestionContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

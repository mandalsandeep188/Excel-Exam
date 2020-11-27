import React, { createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./Components/Routing";
import { inState, reducer } from "./reducers/testReducer";

export const QuestionContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, inState);
  return (
    <QuestionContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </QuestionContext.Provider>
  );
}

export default App;

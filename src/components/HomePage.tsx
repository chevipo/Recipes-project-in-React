import { User } from "../User"
import Login from "./Login"
import { createContext, useReducer } from 'react'
import {ActionReducer} from "../types";
import { RouterProvider } from "react-router";
import { router } from "../router";
import React from "react";

const Reducer = (state: User, action: ActionReducer) => {
  if (action.type === "LOGIN" || action.type === "SIGN_UP" || action.type === "UPDATE") {
      return { ...state, ...action.data };
  }
  return state;
};

export const Context = createContext<{
  user: User;
  Dispatch: React.Dispatch<ActionReducer>;
}>({
  user: { id: 0, firstName: '', lastName: '', email: '', password: '', phone: '' },
  Dispatch: () => {},
});
const HomePage = () =>{
  const [user, Dispatch] = useReducer(Reducer, { id: 0, firstName: '', lastName: '', email: '', password: '', phone: '' });
    return<>
     <Context value={{user,Dispatch}}>
          <RouterProvider router={router} />
          <Login />  
      </Context>
    </>
}
export default HomePage
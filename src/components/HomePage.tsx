import { act } from "react"
import { Action } from "../Action"
import { User } from "../User"
import Login from "./Login"
import { createContext, Dispatch, useReducer } from 'react'
import {Puser, ActionReducer, ContextType} from "../types";


// const userReducer = (state: User, action: Action): User =>{
//     switch(action.type){
//         case('CREATE'):
//             return{
//                 firstName: action.data.firstName ?? state.firstName,
//                 lastName: state.lastName,
//                 email: state.email,
//                 password: action.data.password ?? state.password,
//                 phone: state.phone
//             }
        
//         case('UPDATE'):
//             return{
//                 firstName: action.data.firstName ?? state.firstName,
//                 lastName: action.data.lastName ?? state.lastName,
//                 email: action.data.email ?? state.email,
//                 password: action.data.password ?? state.password,
//                 phone: action.data.phone ?? state.phone
//             }

//         case('DELETE'):
//             return state
        
//         default:
//             return state
        
//     }
// }



// const Reducer = (state: Puser, action: ActionReducer) => {
//     switch (action.type) {
//         case "LOGIN":
//         case "SIGN_UP":
//         case 'UPDATE':

//           return { ...state, ...action.data }
      
//       default:
//         return state
//     }
//   }

const Reducer = (state: Puser, action: ActionReducer) => {
  if (action.type === "LOGIN" || action.type === "SIGN_UP" || action.type === "UPDATE") {
      return { ...state, ...action.data };
  }
  return state;
};

//export const Context = createContext<[User, Dispatch<ActionReducer>]>([{} as User, () => {}]);
export const Context = createContext<ContextType>([{} as Puser, () => {}]);

const HomePage = () =>{
    const [user,userDispatch] = useReducer(Reducer,{} as User);

    return<>
     <Context.Provider value={[user,userDispatch]}>
        <Login/>
      </Context.Provider>
    </>
}
export default HomePage
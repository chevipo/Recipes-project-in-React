import {createContext, FormEvent, useContext, useRef, useState } from "react";
import {
  Button,
  Grid2 as Grid,
  Modal,
  Box,
  Input,
  TextField,
  colors
} from "@mui/material";
import { Context } from "./HomePage";
import { green, red } from "@mui/material/colors";
import { User } from "../User";
import Connected from "./connected";
import { styleForm, StyleHeader } from "./style";
import Update from "./Update";
import axios from "axios";
import {Puser, ActionReducer, ContextType} from "../types";

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  colors: red,
};
export const UserIdContext = createContext<number>(0);

const Login = () => {
  const [open, setOpen] = useState(false); // ניהול מצב האם הטופס פתוח או סגור
  const openForm = () => setOpen(true);

  const [islogin, setIslogin] = useState(false);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [user, Dispatch] = useContext(Context);
  const url = 'http://localhost:5000/api/user'
  const [userId, setUserId] = useState<number>(0);
  const [state, setState] = useState<string>("");
  //////////
  const handleSubmit = async (event: FormEvent, type: "SIGN_UP" | "LOGIN") => {
    event.preventDefault();
    if (!emailRef.current?.value || !passwordRef.current?.value) {
        alert('Email and password are required.');
        return;
    }
    try {
      // const res=userid מה שיהיה....
        const res = await axios.post(
            url + (type === "SIGN_UP" ? "/register" : "/login"),
            {
                email: emailRef.current?.value || user.email,
                password: passwordRef.current?.value || user.password
            },
        )
       
        let userCurrent: User;
        if (type === "LOGIN") {
            userCurrent = res.data.user as User;
            setUserId(res.data.user.id as number)
        }
        else {
            userCurrent = {
                firstName: '',
                lastName: '',
                email: emailRef.current?.value || '',
              //  address: '',
                password: passwordRef.current?.value || '',
                phone: ''
            };
            setUserId(res.data.userId as number)

        }
        Dispatch({type, data: userCurrent })
        setOpen(false); setIslogin(true);
        if (res.data.user && res.data.user.id) {
            localStorage.setItem('userId', res.data.user.id.toString()); // שמירת ה-userId
            console.log("התחברות הצליחה, userId נשמר:", res.data.user.id);
        } else {
            alert("שגיאה בזיהוי המשתמש.");
        }

    }
    catch (error) {
        console.error(error);
        alert('An error occurred. Please try again.');
    } finally {
        emailRef.current!.value = ''
        passwordRef.current!.value = ''
    }
  }
  /////////

 
  return (
    <>
      {/* <button onClick={openForm}>login</button> */}
      <header style={{ padding: '5%' }}>

        <Grid display={"flex"} alignItems={"center"} justifyContent={"flex-center"} alignContent={"flex-start"} >
          {!islogin ? (
            <>
              <div style={StyleHeader}>
                <Button color="primary" onClick={() => { setOpen(!open); setState("Login") }}>Login</Button>
                <Button color="primary" onClick={() => { setOpen(!open); setState("Sign Up") }}>Sign Up</Button>
              </div>
            </>
          ) : (
            <UserIdContext.Provider value={userId}>
              <Connected />
            </UserIdContext.Provider>
          )}

        </Grid>

      </header>
   
      <Modal open={open} onClose={() => { setOpen(false); }}>
                <Box sx={styleForm}>
                    <form onSubmit={(event) => handleSubmit(event, state == "Sign Up" ? "SIGN_UP" : "LOGIN")}>
                        <TextField label="email" inputRef={emailRef} />
                        <TextField label="password" inputRef={passwordRef} type="password"/>
                        <Button type="submit">{state === "Sign Up" ? "Sign Up" : "Login"}</Button>
                    </form>
                </Box>
      </Modal>

    </>
  );
};

export default Login;
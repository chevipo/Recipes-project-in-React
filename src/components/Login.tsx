import {FormEvent, useContext, useRef, useState } from "react";
import { Button,Grid2 as Grid,Modal,Box,TextField,} from "@mui/material";import {red } from "@mui/material/colors";
import { Context } from "./HomePage";
import { User } from "../User";
import Connected from "./connected";
import { styleForm, StyleHeader } from "./style";
import axios from "axios";
import ErrorSnackbar from "./Error";

export const style = {position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,colors: red,};

const Login = () => {
  const [open, setOpen] = useState(false); 
  const [islogin, setIslogin] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const {Dispatch} = useContext(Context);
  const url = 'http://localhost:5000/api/user'
  const [userId, setUserId] = useState<number>(0);
  const [state, setState] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSubmit = async (event: FormEvent, type: "SIGN_UP" | "LOGIN") => {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
        return alert('Email and password are required.');
    }
    try {
        const res = await axios.post(`${url}/${type === "SIGN_UP" ? "register" : "login"}`, { email, password });
        const ID = type === "LOGIN" ? res.data.user.id : res.data.userId;
        const userCurrent: User = type === "LOGIN" ? res.data.user: {id:ID, firstName: '', lastName: '', email, password, phone: '' };
        if (ID) {
            setUserId(ID);
            localStorage.setItem('userId', ID);
            Dispatch({type, data: userCurrent });
            setOpen(false);
            setIslogin(true);
        } 
    } catch (error:any) {
        setError(error);
        setOpenSnackbar(true);
    } finally {
        if (emailRef.current) emailRef.current.value = '';
        if (passwordRef.current) passwordRef.current.value = '';
    }
 };
 return (
    <>
      <header style={{ padding: '5%' }}>
        <Grid display={"flex"} alignItems={"center"} justifyContent={"flex-center"} alignContent={"flex-start"} >
          {!islogin ? (
            <>
              <div style={StyleHeader}>
                <Button color="primary" onClick={() => { setOpen(!open); setState("Login") }}>Login</Button>
                <Button color="primary" onClick={() => { setOpen(!open); setState("Sign Up") }}>Sign Up</Button>
              </div>
            </>
           ) : <Connected/> 
          }
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
      <ErrorSnackbar error={error} open={openSnackbar} onClose={() => setOpenSnackbar(false)} />
    </>
  );
};
export default Login;
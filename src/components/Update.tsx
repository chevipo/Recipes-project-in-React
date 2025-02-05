import { FormEvent, useContext, useRef, useState } from "react";
import { Context } from "./HomePage";
import { Box, Button, Modal, TextField } from "@mui/material";
import { style} from "./Login";
import axios from "axios";
import ErrorSnackbar from "./Error";

export default ({ onClose }: { onClose: () => void }) => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const adressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const {user, Dispatch} = useContext(Context);
    const url = 'http://localhost:3000/api/user'
    const [error, setError] = useState<any>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const updatedUser = {
            firstName: firstNameRef.current?.value || user.firstName,
            lastName: lastNameRef.current?.value || user.lastName,
            email: emailRef.current?.value || user.email,
            phone: phoneRef.current?.value || user.phone,
        };
        try {
            const res = await axios.put(
                url,updatedUser,{ headers: { 'user-id': user.id + '' } }
            )           
            Dispatch({ type: 'UPDATE', data: res.data })
            onClose();
        }catch (error:any) {
            setError(error);
            setOpenSnackbar(true);
        } finally {
            firstNameRef.current!.value = ''
            lastNameRef.current!.value = ''
            emailRef.current!.value = ''
            passwordRef.current!.value = ''
            phoneRef.current!.value = ''
        }
    }
    return (
     <>
        <Modal open={true} onClose= {onClose}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <TextField label='firstName' inputRef={firstNameRef} />
                        <TextField label='lastfirstName' inputRef={lastNameRef} />
                        <TextField label='email' inputRef={emailRef} />
                        <TextField label='adress' inputRef={adressRef} />
                        <TextField label='password' inputRef={passwordRef} />
                        <TextField label='phone' inputRef={phoneRef} />
                        <Button type="submit">save changes</Button>
                    </form>
                </Box>
            </Modal>
            <ErrorSnackbar error={error} open={openSnackbar} onClose={() => setOpenSnackbar(false)} />
        </>)
}
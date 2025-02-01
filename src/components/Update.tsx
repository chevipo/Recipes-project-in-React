import { FormEvent, useContext, useRef, useState } from "react";
import { User } from "../User";
import { Context } from "./HomePage";
import { Box, Button, Grid2, Modal, TextField } from "@mui/material";
import { style, UserIdContext } from "./Login";
import axios from "axios";

export default ({ onClose }: { onClose: () => void }) => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const adressRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const [isUpdate, setIsUpdate] = useState(false)
    const [user, Dispatch] = useContext(Context);
    const url = 'http://localhost:4000/api/user'
    const userID = useContext<number>(UserIdContext);


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const updatedUser = {
            firstName: firstNameRef.current?.value || user.firstName,
            lastName: lastNameRef.current?.value || user.lastName,
            email: emailRef.current?.value || user.email,
          //  address: adressRef.current?.value || user.address,
            phone: phoneRef.current?.value || user.phone,
        };
        try {
            const res = await axios.put(
                url,updatedUser,{ headers: { 'user-id': userID + '' } }
            )           
            Dispatch({ type: 'UPDATE', data: res.data })
            onClose();
        }
        catch (error) {
            console.error(error);
            alert('An error occurred while updating. Please try again.');
        } finally {
            firstNameRef.current!.value = ''
            lastNameRef.current!.value = ''
            emailRef.current!.value = ''
            passwordRef.current!.value = ''
           // adressRef.current!.value = ''
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
        </>)
}
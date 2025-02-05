import { Link } from "react-router"
import { navStyle } from "./style"
import {Button, Box} from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { Context } from "./HomePage";

const NavBar = () => {
   const [isConnected, setIsConnected] = useState(false);
   const {user} = useContext(Context);
   console.log({user});
      
   useEffect(() => {
      if(user?.id){
         setIsConnected(true);
      }
   }, [user?.id]);
  return (<>
    <Box style={navStyle} >
       <Button component={Link} to="/Recipes" 
            sx={{color:'#1976d2','&:hover':{color:'#FFD700',transform:'scale(1.1)'},transition: '0.3s' }}> Recipes
      </Button>
      { isConnected  && ( 
      <Button component={Link} to="/AddRecipe" 
            sx={{color:'#1976d2','&:hover':{color:'#FF69B4',transform:'scale(1.1)'},transition: '0.3s' }}> Add Recipe
      </Button>
     )} 
    </Box>
    </>)
}

export default NavBar;
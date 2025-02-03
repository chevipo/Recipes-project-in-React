import { Link } from "react-router"
import { navStyle } from "./style"
import { AppBar, Toolbar, Button, Box } from '@mui/material';


const NavBar = () => {
    
  return (<>
    <Box style={navStyle} >
      {/* <Button component={Link} to="/Home" 
              sx={{color:'#1976d2','&:hover':{color:'#FFD700',transform:'scale(1.1)'},transition:'0.3s'}} > Home
      </Button> */}

      {/* <Button component={Link} to="/About" 
              sx={{color:'#1976d2','&:hover':{color:'#FF69B4',transform:'scale(1.1)'},transition:'0.3s'}}> About
      </Button> */}

      <Button component={Link} to="/Recipes" 
            sx={{color:'#1976d2','&:hover':{color:'#FFD700',transform:'scale(1.1)'},transition: '0.3s' }}> Recipes
      </Button>
      <Button component={Link} to="/AddRecipe" 
            sx={{color:'#1976d2','&:hover':{color:'#FF69B4',transform:'scale(1.1)'},transition: '0.3s' }}> Add Recipe
      </Button>
    </Box>
    </>)
}

export default NavBar
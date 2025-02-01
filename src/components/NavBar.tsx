import { Link } from "react-router"
import { navStyle } from "./style"

const NavBar = () => {
    
    return (<>
        <nav style={navStyle}>
        <Link to="Home">Home</Link>|
        <Link to="About">About</Link>|
        <Link to="Recipes">Recipes</Link>
        </nav>
    </>)
}

export default NavBar
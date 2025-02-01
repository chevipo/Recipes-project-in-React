// import { createBrowserRouter, Outlet } from 'react-router'
// import NavBar from './components/NavBar'
// import About from './components/About'
// import Home from './components/Home'
// import Profile from './components/profile'
// import { BrowserRouter } from 'react-router-dom';



// export const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <><NavBar/><Outlet /></>,
//       children : [
//       {path: 'home', element: <Home/>},
//       {path: 'about', element: <About/>},
//       {path: 'profile', element: <Profile/>},]
        
// }])
import { createBrowserRouter, Outlet } from 'react-router'
import NavBar from './components/NavBar'
import About from './components/About'
import Home from './components/Home'
import Profile from './components/profile'
import Recipes from './components/recipes/RecipesList'


export const router = createBrowserRouter([
    {
      path: '/',
      element: <><NavBar/><Outlet /></>,
      children : [
      {path: 'home', element: <Home/>},
      {path: 'about', element: <About/>},
      {path: 'Recipes', element: <Recipes/>},

    ]
        
    }])
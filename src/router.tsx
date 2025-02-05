import { createBrowserRouter, Outlet } from 'react-router';
import NavBar from './components/NavBar';
import Recipes from './components/recipes/RecipesList';
import AddRecipe from './components/recipes/AddRecipe';
import PrivateRoute from './PrivateRouter'; 

export const router = createBrowserRouter([
{
      path: '/',
      element: <><NavBar/><Outlet /></>,
      children : [
      {path: 'Recipes', element: <Recipes/>},
      { path: 'AddRecipe', 
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ) },
    ]
}])
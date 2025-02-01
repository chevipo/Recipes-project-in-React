import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import HomePage from './components/HomePage'
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router'
import { router } from './router'

function App() {

  return (
    <>
     {/* <BrowserRouter> */}
     <HomePage></HomePage>
     <RouterProvider router={router} />

    {/* </BrowserRouter> */}
    </>
  )
}

export default App

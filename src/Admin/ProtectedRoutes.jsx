import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Menu from './Menu';
import Page404 from '../404/Page404';

const ProtectedRoutes = () => {
  let token = localStorage.getItem("CC_Token");

    return (
    token!=null ? <><Menu/><Outlet/></> : <Page404/>
  )
}

export default ProtectedRoutes

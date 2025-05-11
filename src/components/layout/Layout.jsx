import React from 'react'
import Navbar from '../navbar/Navbar';
import NavAmazon from '../navbar/NavAmazon';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <>
      <NavAmazon />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout

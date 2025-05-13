import React from 'react'
import NavAmazon from '../navbar/NavAmazon';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <>
      <NavAmazon />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout

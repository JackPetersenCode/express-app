import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
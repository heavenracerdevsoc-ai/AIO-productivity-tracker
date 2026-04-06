import React from "react";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import Auth from "./Auth";

const Content = () => {
  const isAuthenticated = useSelector((s) => s.user?.isAuthenticated);
  return isAuthenticated ? <Layout /> : <Auth />;
};

export default Content;

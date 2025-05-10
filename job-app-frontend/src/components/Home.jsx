import React, { useContext } from "react";
import Navbar from "./Navbar";
import DisplayJobs from "./DisplayJobs";
import Footer from "./Footer";
import LandingPage from "./LandingPage";

import { UserContext } from "../context/UserContext";

const Home = () => {

  const {user} = useContext(UserContext);

  return (
    <>
    {user ? (
      <>
    <Navbar/>
    <DisplayJobs/>
    <Footer />
    </>) : (<LandingPage />)
    }
      
    </>
  );
};

export default Home;

import React from "react";
import undrawSVG from '../assets/undraw_career_progress_ivdb.svg';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen grid grid-cols-1 lg:grid-cols-2 justify-center items-center bg-slate-100">

        <div className="hidden lg:block ml-20">
          <img src={undrawSVG} alt=""/>
        </div>

        <div className="text-center text-blue-600">
          <h1 className="company-name text-8xl font-bold">Jobify</h1>
          <p className="mt-12 font-semibold italic text-2xl">
            A place to get your dream jobs...
          </p>

          <div className="mt-16">
            <button
              className="mr-4 px-3 h-10 font-semibold rounded-md border-2 border-transparent
            text-white bg-blue-500 hover:border-blue-400 hover:text-blue-600 hover:bg-white transition duration-300 text-xl"
              type="submit"
              onClick={() => navigate("/sign-up")}
            >
              Get Started
            </button>
            <button
              className="ml-4 px-4 h-10 font-semibold rounded-md border-2 border-blue-300
                  hover:text-white hover:bg-blue-500 transition duration-300 text-xl"
              type="submit"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

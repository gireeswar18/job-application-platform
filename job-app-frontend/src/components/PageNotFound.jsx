import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative h-screen  bg-slate-100 flex justify-center items-center">
        <header className="absolute top-4 left-4">
          <h1 className="company-name text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/home", { state: { user } })}>
            Jobify
          </h1>
        </header>
        <div className="flex flex-col m-2 sm:m-0 w-[80%] text-blue-600">
          <div className="m-4">
            <h1 className="font-bold text-4xl">404 - Page Not Found</h1>

			<p className="text-black mt-8 text-2xl">The page you are looking for may have been moved or deleted.</p>
            <button
              className="mt-12 mb-4 px-3 h-8 font-semibold rounded-md border-2 border-blue-300
            hover:text-white hover:bg-blue-500 transition duration-300"
              type="submit"
			  onClick={() => navigate("/home")}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;

import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  let { user, setUser } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [applied, setApplied] = useState([]);

  const back = "https://job-app-backend-jp7h.onrender.com";

  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${back}/user-info/${user.email}`
      );
      setUser(response.data);

      const promises = user.jobsPosted.map((id) =>
        axios.get(`${back}/post/${id}`)
      );
      const responses = await Promise.all(promises);

      setPosts(responses.map((resp) => resp.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getApplies = async () => {
    try {
      const response = await axios.get(
        `${back}/user-info/${user.email}`
      );
      user = response.data;

      const promises = user.jobsApplied.map((id) =>
        axios.get(`${back}/post/${id}`)
      );
      const responses = await Promise.all(promises);

      setApplied(responses.map((resp) => resp.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getDetails = (id) => {
    navigate(`/post/${id}`);
  };

  const signOut = async (e) => {
    e.preventDefault();

    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      try {
        const resp = await axios.put(
          `${back}/sign-out/${user.email}`
        );

        if (resp.status === 200) {
          alert("User signed out successfully.");

          localStorage.clear();

          setUser(null);

          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getPosts();
    getApplies();
  }, []);

  return (
    <>
      <div className="relative h-screen  bg-slate-100 flex justify-center items-center">
        <header className="absolute top-4 left-4">
          <h1
            className="company-name text-2xl font-bold text-blue-600"
            onClick={() => navigate("/home")}
          >
            Jobify
          </h1>
        </header>

        <div className="flex flex-col">
          <div className="grid grid-cols-2">
            <div className="text-blue-600 font-semibold text-2xl">
              Username:
            </div>
            <div className="text-2xl">{user.username}</div>
            <div className="text-blue-600 font-semibold text-2xl mt-4">
              Email:
            </div>
            <div className="text-2xl mt-4">{user.email}</div>
            <div className="text-blue-600 font-semibold text-2xl mt-4">
              Jobs Posted:
            </div>
            <div>
              <ul className="mt-4">
                {posts.length != 0 ? (
                  posts.map((post) => (
                    <li
                      key={post.id}
                      className="text-2xl flex items-center text-black border border-blue-500 p-2 rounded-md overflow-hidden mb-2 cursor-pointer"
                      onClick={() => getDetails(post.id)}
                    >
                      <span className="flex-grow mr-2 break-words overflow-hidden">
                        {post.jobTitle}
                      </span>
                      
                    </li>
                  ))
                ) : (
                  <li className="text-2xl">No jobs posted.</li>
                )}
              </ul>
            </div>
            <div className="text-blue-600 font-semibold text-2xl mt-4">
              Jobs Applied:
            </div>
            <div>
              <ul className="mt-4">
                {applied.length != 0 ? (
                  applied.map((post) => (
                    <li
                      key={post.id}
                      className="text-2xl flex items-center text-black border border-blue-500 p-2 rounded-md overflow-hidden mb-2"
                    >
                      <span className="flex-grow mr-2 break-words overflow-hidden">
                        {post.jobTitle}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-2xl">No jobs applied.</li>
                )}
              </ul>
            </div>
          </div>
          <div className="text-center mt-16 font-semibold">
            <button
              className="px-5 h-12 font-semibold rounded-md border-2 border-red-400
                  bg-red-600 hover:text-red-600 hover:bg-white transition duration-300 text-xl text-white"
              type="submit"
              onClick={(e) => signOut(e)}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const JobDetails = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const back = "https://job-app-backend-jp7h.onrender.com";

  const { id } = useParams();

  const [isPoster, setIsPoster] = useState(false);
  const [post, setPost] = useState(null);
  const [req, setReq] = useState([]);
  const [isApplied, setIsApplied] = useState(false);

  const deletePost = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Do you sure want to delete this post?");

    if (confirm) {
      try {
        const resp = await axios.delete(
          `${back}/post/delete/${id}/${user.id}`
        );

        if (resp.status === 200) {
          setUser(resp.data);
          alert("Post deleted successfully.");
          navigate("/home", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const applyPost = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.put(
        `${back}/${user.id}/post/${id}/apply`
      );

      if (resp.status === 200) {
        setUser(resp.data);
        alert("Application sent successfully.");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const resp = await axios.get(`${back}/post/${id}`);

        if (resp.status === 200) {
          setPost(resp.data);

          setReq(resp.data.requirements);

          if (resp.data.jobPoster === user.email) setIsPoster(true);

          const jobsApplied = user.jobsApplied;

          if (jobsApplied.some((job) => job === id)) setIsApplied(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDetails();
  }, [user]);

  return (
    <>
      <div className="relative h-screen  bg-slate-100 flex justify-center items-center">
        <header className="absolute top-4 left-4">
          <h1
            className="company-name text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Jobify
          </h1>
        </header>
        <div className="flex flex-col m-2 sm:m-0 rounded-2xl border-2 border-blue-200  w-[60%] ">
          <div className="m-4">
            <h1 className="font-bold text-center text-2xl text-blue-600">
              Job Details
            </h1>

            <div className="grid grid-cols-2">
              <div className="font-semibold text-xl mt-4">Role</div>
              <div className="text-xl mt-4">{post && post.jobTitle}</div>
              <div className="font-semibold text-xl mt-4">Description</div>
              <div className="text-xl mt-4">{post && post.desc}</div>
              <div className="font-semibold text-xl mt-4">Experience</div>
              <div className="text-xl mt-4">{post && post.exp}</div>
              <div className="font-semibold text-xl mt-4">Company</div>
              <div className="text-xl mt-4">{post && post.companyName}</div>
              <div className="font-semibold text-xl mt-4">Requirements</div>
              <div className="text-xl mt-4">
                <ul>
                  {post &&
                    req.map((r, index) => (
                      <li key={index}>
                        <b>{index + 1}. </b> {r}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              {!isPoster ? (
                isApplied ? (
                  <div className="mt-8 mb-4 px-5 h-12 font-semibold text-xl text-blue-600">
                      Already applied
                  </div>
                ):(
                <button
                  className="mt-8 mb-4 px-5 h-12 font-semibold rounded-md border-2 border-blue-400
                  hover:text-white hover:bg-blue-500 transition duration-300 text-xl text-blue-600"
                  type="submit"
                  onClick={(e) => applyPost(e)}
                >
                  Apply
                </button>
                )
              ) : (
                <button
                  className="mt-8 mb-4 px-5 h-12 font-semibold rounded-md border-2 border-red-400
                  hover:text-white hover:bg-red-500 transition duration-300 text-xl text-red-600"
                  type="submit"
                  onClick={(e) => deletePost(e)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;

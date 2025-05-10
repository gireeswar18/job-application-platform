import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostingPage = () => {

  const {user} = useContext(UserContext);

  const back = "https://job-app-backend-jp7h.onrender.com";

  const navigate = useNavigate();

  let [thisUser, setThisUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    jobsPosted: [],
    jobsApplied: [],
    isLoggedIn: false
  });


  const [requirement, setRequirement] = useState("");
  const [reqList, setReqList] = useState([]);

  const [jobTitle, setJobTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [exp, setExp] = useState("");
  const [company, setCompany] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {

    const fetch = () => {

      setThisUser(user);
    }

    fetch();

  });

  const addToList = (e) => {
    e.preventDefault();
    if (requirement.trim() !== "") {
      setReqList([...reqList, requirement]);
      setRequirement("");
    }
  };

  const removeFromList = (index) => {
    setReqList(reqList.filter((_, i) => i !== index));
  };

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const resp = await axios.post(`${back}/post/user/${thisUser.id}`, {
        jobTitle: jobTitle,
        desc: desc,
        exp: exp,
        requirements: reqList,
        jobPoster: thisUser.email,
        companyName: company,
      });

      if (resp.status === 200) {
        alert("Job Posted Successfully.")
        navigate("/home" );
      }

    } 
    catch (error) {
      setJobTitle("");
      setDesc("");
      setExp("");
      setCompany("");
      setRequirement("");
      setReqList([]);
      setError("Unable to post this job. Try agin later.")
    }
  };

  return (
    <>
      <div className="relative h-screen  bg-slate-100 flex justify-center items-center">
        <header className="absolute top-4 left-4 hidden md:block">
          <h1 className="company-name text-2xl font-bold text-blue-600" onClick={() => navigate("/home")}>
            Jobify
          </h1>
        </header>
        <div className="flex flex-col m-2 w-[32rem] sm:m-0 rounded-2xl border-2 border-blue-200 text-blue-600">
          <div className="m-4">
            <h1 className="font-bold text-center text-2xl">Post a job</h1>

            {error && (
              <div className="text-red-600 text-center mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label htmlFor="title">Job Title</label>
                <br />
                <input
                  className="w-full mt-1 pl-2 pr-2 h-8 outline-none text-black"
                  type="text"
                  id="title"
                  placeholder="Java Developer"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="desc">Description</label>
                <br />
                <textarea
                  className="w-full mt-1 pl-2 pr-2 outline-none text-black"
                  type="text"
                  id="desc"
                  rows="3"
                  placeholder="Daily works, Job location..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="exp">Experience</label>
                <br />
                <input
                  className="w-full mt-1 pl-2 pr-2 h-8 outline-none text-black"
                  type="text"
                  id="exp"
                  placeholder="Years of experience"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="req">Requirements</label>
                <br />
                <input
                  className="w-[75%] mt-1 pl-2 pr-2 h-8 outline-none text-black"
                  type="text"
                  id="req"
                  value={requirement}
                  placeholder="Java, React..."
                  onChange={(e) => setRequirement(e.target.value)}
                />
                <button
                  className="w-[22%] px-3 h-8 rounded-md
            	text-white bg-blue-500 ml-2 hover:bg-blue-800"
                  type="submit"
                  onClick={(e) => addToList(e)}
                >
                  Add
                </button>
              </div>

              <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                {reqList.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-center text-black border border-blue-500 p-2 rounded-md overflow-hidden"
                  >
                    <span className="flex-grow mr-2 break-words overflow-hidden text-sm">
                      {req}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromList(index)}
                      className="text-red-500 hover:text-red-700 focus:outline-none flex-shrink-0"
                    >
                      <CloseIcon />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <label htmlFor="company">Company Name</label>
                <br />
                <input
                  className="w-full mt-1 pl-2 pr-2 h-8 outline-none text-black"
                  type="text"
                  id="company"
                  placeholder="Jobify"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <button
                  className="mt-8 mb-4 px-3 h-8 font-semibold rounded-md border-2 border-blue-300 w-24
                  hover:text-white hover:bg-blue-500 transition duration-300"
                  type="submit"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostingPage;

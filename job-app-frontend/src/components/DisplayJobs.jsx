import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostsList = () => {

  const {user} = useContext(UserContext);

  const back = "https://job-app-backend-jp7h.onrender.com";

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${back}/all-posts`);
        setPosts(response.data);
      } catch (err) {
        setError("Currently no jobs available. Please try again later.");
      }
    };

    fetchPosts();
  }, []);

  const getDetails = (id) => {
    navigate(`/post/${id}`);
  }

  if (error) return <div className="text-red-500 text-center mt-8 ">{error}</div>;

  return (
    <>
      <div className=" bg-slate-100 pt-16 min-h-[100vh]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {posts.map((post) => (
			<div key={post.id} className="border-2 border-slate-300 rounded mx-20 mt-8 p-4 hover:shadow-lg hover:shadow-slate-500/50 transition-shadow cursor-pointer" onClick={() => getDetails(post.id)}>
				<h3 className="font-bold text-xl">{post.jobTitle}</h3>
				<p className="mt-8"><span className="font-semibold">Company: </span>{post.companyName}</p>
				<p className="mt-2"><span className="font-semibold">Experience: </span>{post.exp}</p>
				
			</div>
		  ))}
        </div>
      </div>
    </>
  );
};

export default PostsList;

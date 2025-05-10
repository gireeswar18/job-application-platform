import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  const back = "https://job-app-backend-jp7h.onrender.com";

  const searchP = async () => {
    try {
      const resp = await axios.get(
        `${back}/post/search/${search}`
      );

      if (resp.status === 200) setPosts(resp.data);
    } catch (error) {
      console.log(error);
      setPosts([]);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.trim() === "") {
        setPosts([]);
      } else {
        searchP();
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const getDetails = (id) => {
    navigate(`/post/${id}`);
  };

  const goBack = () => {
    navigate("/home");
  };

  return (
    <>
      <div className="relative h-screen bg-slate-100">
        <header className="pt-4 pl-4">
          <h1 className="company-name text-2xl font-bold text-blue-600 cursor-pointer" onClick={goBack}>
            Jobify
          </h1>
		  <button
          className="absolute top-4 right-4 text-blue-600 font-semibold p-2 rounded"
          onClick={goBack}
        >
          Go Back
        </button>
        </header>

        <div className="mt-4 px-4">
          <input
            type="search"
            className="w-full outline-none p-3 rounded-sm"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {posts.length === 0 ? (
          <div className="pt-12 pl-8 font-semibold text-xl">No results</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border-2 border-slate-300 rounded mx-20 mt-8 p-4 hover:shadow-lg hover:shadow-slate-500/50 transition-shadow cursor-pointer"
                onClick={() => getDetails(post.id)}
              >
                <h3 className="font-bold text-xl">{post.jobTitle}</h3>
                <p className="mt-8">
                  <span className="font-semibold">Company: </span>
                  {post.companyName}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Experience: </span>
                  {post.exp}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;

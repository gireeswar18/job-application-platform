import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {setUser} = useContext(UserContext);

  const back = "https://job-app-backend-jp7h.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.put(`${back}/sign-in`, {
        email: email,
        password: password,
      });

      if (resp.status === 200) {
        setUser(resp.data);
        navigate("/home",{replace: true});
      }
    }
    catch (error) {
      setEmail("");
      setPassword("");
      setError("Invalid email or password. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative h-screen  bg-slate-100 flex justify-center items-center">
        <header className="absolute top-4 left-4">
          <h1 className="company-name text-2xl font-bold text-blue-600">
            Jobify
          </h1>
        </header>
        <div className="flex flex-col m-2 sm:m-0 rounded-2xl border-2 border-blue-200  w-96 text-blue-600">
          <div className="m-4">
            <h1 className="font-bold text-center text-2xl">Sign In</h1>

            {error && (
              <div className="text-red-600 text-center mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className="w-full mt-1 pl-2 pr-2 h-8 outline-none text-black"
                  type="text"
                  id="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <label htmlFor="pass">Password</label>
                <br />
                <input
                  className="w-full mt-1 pl-2 pr-2 h-8 outline-none text-black"
                  type="password"
                  id="pass"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="mt-8 mb-4 px-3 h-8 font-semibold rounded-md border-2 border-blue-300
                  hover:text-white hover:bg-blue-500 transition duration-300"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              <div className="flex justify-center flex-col text-center mt-4">
                <p>
                  No account?{" "}
                  <button
                    className="underline"
                    onClick={() => navigate("/sign-up")}
                  >
                    Create one
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

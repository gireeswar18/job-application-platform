import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "./index.css";
import PageNotFound from "./components/PageNotFound";
import LandingPage from "./components/LandingPage";
import PostingPage from "./components/PostingPage";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";
import { UserProvider } from "./context/UserContext";
import Search from "./components/Search";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/post" element={<PostingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<JobDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

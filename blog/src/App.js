import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginn from "./Login/Loginn";
import SignnUp from "./Login/SignnUp";
import UserDashboard from "./Components/UserDashboard";
import Privateroutes from "./Components/Privateroutes";
import Home from "./Home/Home";
import BlogDetail from "./Components/BlogDetail";
import BlogsPage from "./Components/BlogsPage";
import UpdateBlog from "./Components/UpdateBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Loginn />} />
        <Route path="/sign-up" element={<SignnUp />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
         <Route path="/blogs" element={<BlogsPage />} />
         <Route path="/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/user" element={<Privateroutes />}>
          <Route path="user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
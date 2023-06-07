import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateQuote from "./components/crearteQuote";
import Profile from "./components/profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Notfound from "./components/notFound";
import UpdateProfile from "./components/updateProfile";
import UpdateQuote from "./components/updateQuote";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuote />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateQuote />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/updatequote/:_id" element={<UpdateQuote />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;

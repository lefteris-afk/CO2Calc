import "./App.css";
import Home from "./components/LandingPage/Home";
import About from "./components/LandingPage/About";
import Contact from "./components/LandingPage/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Account from "./components/Account";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Domains from "./components/Calculator/Domains";
import Users from "./components/Administrative/Users";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  // Check If User is Logged In
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const isLoggedIn = async () => {
    await Axios.get(process.env.REACT_APP_BACKEND_URL + "api/users/auth", {
      withCredentials: true,
    }).then(
      (res) => {
        if (res.data.username.length > 0) {
          setLogged(true);
          setUsername(res.data.username);
          setRole(res.data.role);
        }
      },
      (error) => {
        setLogged(false);
        setUsername("");
        setRole("");
        console.log(error);
      }
    );
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div className="App">
      <Navbar auth={!logged} username={username} role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={<ProtectedRoute element={<Login />} auth={!logged} />}
        />
        <Route
          path="/register"
          element={<ProtectedRoute element={<Register />} auth={!logged} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calculator" element={<Domains role={role} />} />
        <Route
          path="/account"
          element={<ProtectedRoute element={<Account />} auth={logged} />}
        />
        <Route
          path="/logout"
          element={<ProtectedRoute element={<Logout />} auth={logged} />}
        />
        <Route
          path="/users"
          element={
            <AdminRoute element={<Users username={username} />} role={role} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

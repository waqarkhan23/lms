import "./App.css";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/client/Home";
import MyLearning from "./pages/client/MyLearning";
import Profile from "./pages/client/Profile";
import Login from "./pages/login";
import Verify from "./pages/Verify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

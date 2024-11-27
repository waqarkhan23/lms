import "./App.css";
import MainLayout from "./layout/MainLayout";
import Analytics from "./pages/admin/Analytics";
import AddCourse from "./pages/admin/course/AddCourse";
import CreateCourse from "./pages/admin/course/CreateCourse";
import UpdateCourse from "./pages/admin/course/UpdateCourse";
import Dashboard from "./pages/admin/Dashboard";

import Home from "./pages/client/Home";
import MyLearning from "./pages/client/MyLearning";
import Profile from "./pages/client/Profile";
import Login from "./pages/login";
import ProtectedRoutes from "./pages/protectedRoutes/ProtectedRoutes";
import Verify from "./pages/Verify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={["instructor"]} />}>
            <Route path="/admin" element={<Dashboard />}>
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />}
              />
              <Route path="dashboard" element={<Analytics />} />
              <Route path="courses" element={<AddCourse />} />
              <Route path="courses/create-course" element={<CreateCourse />} />
              <Route
                path="courses/edit-course/:id"
                element={<UpdateCourse />}
              />
            </Route>
          </Route>
          <Route path="/verify" element={<Verify />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

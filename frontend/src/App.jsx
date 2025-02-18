import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginSignUpPage/Login";
import SignUp from "./pages/LoginSignUpPage/SignUp";
import Browse from "./pages/HomePage/Browse";
import Songs from "./pages/HomePage/Songs";

const homeRoutes = [
  { path: "browse", element: <Browse/>},
  { path: "songs", element: <Songs/>}
];

function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Navigate to="/browse" replace /> }, // Điều hướng "/" -> "/browse"
    { path: "/", element: <HomePage/>, children: homeRoutes },
    { path: "/login", element: <Login/>},
    { path: "/signup", element: <SignUp/>}
  ]);
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

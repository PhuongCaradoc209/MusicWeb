import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Browse from "./HomePage/MainBody/Body/Browse";
import Songs from "./HomePage/MainBody/Body/Songs";
import Login from "./LoginSignupPage/Login";

const homeRoutes = [
  { path: "browse", element: <Browse /> },
  { path: "songs", element: <Songs/>}
];

function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Navigate to="/browse" replace /> }, // Điều hướng "/" -> "/browse"
    { path: "/", element: <HomePage />, children: homeRoutes },
    { path: "/login", element: <Login />},
    { path: "/signup", element: <Login />}
  ]);
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

// App.js
import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginSignUpPage/Login";
import SignUp from "./pages/LoginSignUpPage/SignUp";
import BrowsePage from "./pages/HomePage/BrowsePage";
import SongPage from "./pages/HomePage/SongPage";
import { AuthProvider } from "./helpers/AuthorProvider";

const homeRoutes = [
  { path: "browsePage", element: <BrowsePage /> },
  { path: "songsPage", element: <SongPage /> }
];

function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Navigate to="/browsePage" replace /> },
    { path: "/", element: <HomePage />, children: homeRoutes },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> }
  ]);
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
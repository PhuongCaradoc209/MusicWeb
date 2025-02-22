// App.js
import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginSignUpPage/Login";
import SignUp from "./pages/LoginSignUpPage/SignUp";
import BrowsePage from "./pages/HomePage/BrowsePage";
import SongPage from "./pages/HomePage/SongPage";
import { AuthProvider } from "./helpers/AuthorProvider";
import Top_50_page from "./pages/HomePage/Top_50_page";
import Songs from "./pages/HomePage/Songs";

const homeRoutes = [
  { path: "browsePage", element: <BrowsePage /> },
  { 
    path: "songsPage", 
    element: <SongPage />, 
    children: [
      { index: true, element: <Songs /> }, 
      { path: "top50/vietnam", element: <Top_50_page /> },
      { path: "top50/us-uk", element: <Top_50_page /> },
      { path: "top50/korea", element: <Top_50_page /> },
    ]
  }
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
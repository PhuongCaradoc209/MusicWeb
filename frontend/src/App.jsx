import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginSignUpPage/Login";
import SignUp from "./pages/LoginSignUpPage/SignUp";
import BrowsePage from "./pages/HomePage/BrowsePage/BrowsePage";
import { AuthProvider } from "./helpers/AuthorProvider";
import Callback from "./pages/LoginSignUpPage/Callback";
import SinglePlayer from "./pages/Player/SinglePlayer";
import Songs from "./pages/HomePage/SongPage/Songs";
import Top_50_page from "./pages/HomePage/SongPage/Top_50_page";
import SongPage from "./pages/HomePage/SongPage/SongPage";
import { path } from "framer-motion/client";
import SearchPage from "./pages/SearchPage/SearchPage";
import AlbumPage from "./pages/AlbumPage";
import { MusicProvider } from "./helpers/MusicProvider";
import PlayerPage from "./pages/Player/PlayerPage";

const homeRoutes = [
  { path: "browsePage", element: <BrowsePage /> },
  { 
    path: "songsPage", 
    element: <SongPage/>,
    children: [
      { index: true, element: <Songs /> }, 
      { path: "top50/:country/:playlistId", element: <Top_50_page /> }
    ]
  },
  { path: "searchPage", element: <SearchPage/>},
  { path: "albumsPage", element: <AlbumPage/>}
];

function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Navigate to="/browsePage" replace /> },
    { path: "/", element: <HomePage />, children: homeRoutes },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/callback", element: <Callback /> },
    { path: "/player/top/50/:country/playlist/:playlistId/track/:songId", element: <PlayerPage/> },
    { path: "/player/:songId", element: <PlayerPage /> },
  ]);
}

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.onload = () => {
      console.log("Spotify Web Playback SDK đã tải xong!");

      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log("SDK sẵn sàng!", window.Spotify);
      };
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <MusicProvider> 
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </MusicProvider>
  );
}

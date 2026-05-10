import { useState } from "react";
import "./styles/global.css";

import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Profile, PostProject, Explore, Teammates } from "./pages/Pages";
import Hackathon from "./pages/Hackathon";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [page, setPage] = useState("home");
  const noNav = page === "auth";

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "auth":
        return <Auth setPage={setPage} />;
      case "profile":
        return <Profile setPage={setPage} />;
      case "post":
        return <PostProject setPage={setPage} />;
      case "explore":
        return <Explore setPage={setPage} />;
      case "teammates":
        return <Teammates />;
      case "hackathon":
        return <Hackathon />;
      case "chat":
        return <Chat />;
      case "dashboard":
        return <Dashboard setPage={setPage} />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div>
      <Cursor />
      {!noNav && <Navbar page={page} setPage={setPage} />}
      {renderPage()}
    </div>
  );
}

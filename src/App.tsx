import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/hooks/useAuth";
import LoadingScreen from "@/components/LoadingScreen";
import ConnectionGate from "@/components/ConnectionGate";
import { NotFoundPage } from "@/components/ui/404-page-not-found";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/ui/music-player";
import bgMusic from "@/components/gallery/kontraa-no-sleep-hiphop-music-473847.mp3";
import heroVideo from "@/assets/pj/hero-compressed.mp4";
import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Profile from "@/pages/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <>
        <LoadingScreen duration={5000} onComplete={() => setLoading(false)} />
        {/* Hidden preloader — downloads the hero video in parallel with the
            loading screen so CreativeHero plays instantly when it mounts. */}
        <video
          src={heroVideo}
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
          className="fixed -z-10 opacity-0 pointer-events-none w-px h-px"
        />
      </>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <AuthProvider>
      <ConnectionGate>
      <ScrollToTop />
      <Routes>
        {/* Auth pages — standalone, no navbar/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* All other pages with shared layout */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <MusicPlayer src={bgMusic} />
            </div>
          }
        />
      </Routes>
      </ConnectionGate>
      </AuthProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

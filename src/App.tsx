import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/hooks/useAuth";
import MagicalEyesLoader from "@/components/MagicalEyesLoader";
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
  // Block body on purpose — never `() => window.scrollTo(0, 0)`. Recent Chrome
  // returns a Promise from scrollTo, and a concise arrow hands that Promise to
  // React as the effect's cleanup, crashing the tree on the next unmount.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  // Set by the entry gate: the click that dismisses it is also the gesture that
  // unlocks audio, so the player can start on mount instead of waiting for a
  // second interaction.
  const [withAudio, setWithAudio] = useState(false);

  if (loading) {
    return (
      <>
        <MagicalEyesLoader
          markLead="M"
          markRest="AGICAL EYES"
          onEnter={(audio) => {
            setWithAudio(audio);
            setLoading(false);
          }}
        />
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
              <MusicPlayer src={bgMusic} autoPlay={withAudio} />
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

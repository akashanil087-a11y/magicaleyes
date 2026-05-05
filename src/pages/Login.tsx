import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/hooks/useAuth";
import loginImg from "@/assets/pj/pj19.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const { login, googleLogin, user } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = await res.json();
        googleLogin(profile.email, profile.name, profile.picture);
        navigate("/");
      } catch {
        setError("Google sign-in failed. Please try again.");
      }
    },
    onError: () => setError("Google sign-in was cancelled."),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = login(email, password, remember);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="h-screen flex bg-[#fafafa]">
      {/* ── Left: Image ── */}
      <div className="hidden lg:block w-[45%] p-3">
        <div className="relative h-full w-full rounded-3xl overflow-hidden">
          <img
            src={loginImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center items-center px-6 md:px-12 lg:px-16 xl:px-24 overflow-y-auto">
        <div className="w-full max-w-md py-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <svg className="w-7 h-7 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
            <span className="text-lg font-semibold text-gray-800 tracking-tight">Magical</span>
          </div>

          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 text-center mb-1.5">
            Login to your account
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Welcome back! Enter your details to log in to your account
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {/* Demo credentials hint */}
          <div className="mb-5 px-4 py-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs text-center leading-relaxed">
            <span className="font-semibold">Demo:</span> admin@magical.com / magical123
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-[13px] text-gray-600">Remember login</span>
              </label>
              <a href="#" className="text-[13px] text-purple-600 hover:text-purple-700 font-medium">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl px-4 py-3 transition-colors duration-300 mt-2 cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social login — stacked buttons */}
          <div className="space-y-3">
            {/* Apple — opens popup simulation since Apple Sign In requires paid developer account */}
            <button
              type="button"
              onClick={() => setError("Apple Sign In requires an Apple Developer account. Use Google or email login instead.")}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2.5 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 pointer-events-none">Sign in with Apple</span>
            </button>

            {/* Google */}
            <button type="button" onClick={() => handleGoogleLogin()} className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2.5 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
              <svg className="w-5 h-5 pointer-events-none" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-sm font-medium text-gray-700 pointer-events-none">Sign in with Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-7">
            New here?{" "}
            <Link to="/register" className="font-semibold text-purple-600 hover:text-purple-700 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

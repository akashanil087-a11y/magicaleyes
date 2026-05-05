import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  name?: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => { success: boolean; error?: string };
  register: (email: string, password: string, name: string) => { success: boolean; error?: string };
  googleLogin: (email: string, name?: string, picture?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Key for storing registered accounts
const ACCOUNTS_KEY = "magical_accounts";
const SESSION_KEY = "magical_user";

// Seed a default demo account on first load
function getAccounts(): Record<string, { password: string; name: string }> {
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch { /* fall through */ }
  }
  // Seed demo account
  const seed = { "admin@magical.com": { password: "magical123", name: "Admin" } };
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(seed));
  return seed;
}

function saveAccounts(accounts: Record<string, { password: string; name: string }>) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, remember = false) => {
    if (!email.trim()) return { success: false, error: "Please enter your email" };
    if (!password.trim()) return { success: false, error: "Please enter your password" };

    const accounts = getAccounts();
    const account = accounts[email.toLowerCase()];

    if (account && account.password === password) {
      const userData: User = { email, name: account.name };
      setUser(userData);
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(SESSION_KEY, JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const register = (email: string, password: string, name: string) => {
    if (!name.trim()) return { success: false, error: "Please enter your name" };
    if (!email.trim()) return { success: false, error: "Please enter your email" };
    if (!password.trim()) return { success: false, error: "Please enter a password" };
    if (password.length < 6) return { success: false, error: "Password must be at least 6 characters" };

    const accounts = getAccounts();
    if (accounts[email.toLowerCase()]) {
      return { success: false, error: "An account with this email already exists" };
    }

    accounts[email.toLowerCase()] = { password, name };
    saveAccounts(accounts);

    const userData: User = { email, name };
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    return { success: true };
  };

  const googleLogin = (email: string, name?: string, picture?: string) => {
    const userData: User = { email, name, picture };
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login", { replace: true });
  }, [user, isLoading, navigate]);

  if (isLoading) return null;
  if (!user) return null;
  return <>{children}</>;
}

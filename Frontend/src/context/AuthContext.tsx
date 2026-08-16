import { createContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: number;
  email: string;
  fullName: string;
  role: "USER" | "ADMIN";
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) return;
    const checkAuth = async () => {
      const response = await fetch("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setToken(null);
        localStorage.removeItem("token");
      }
      const data = await response.json();

      setUser(data.user);
    };
    checkAuth();
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ token, setToken, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

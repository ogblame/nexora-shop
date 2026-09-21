import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode,
} from "react";

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  logout: () => void;
  checkAuth: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: number;
  email: string;
  fullName: string;
  role: "USER" | "ADMIN";
  phone: string | null;
  deliveryAddress: string | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    const response = await fetch("/auth/me", {
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

  useEffect(() => {
    if (!token) return;

    checkAuth();
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ token, setToken, user, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../utils/cookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user on app start
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/auth/profile", {
          credentials: "include",
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Login
  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/profile", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  // Logout
  const logout = async () => {
      const csrfToken = getCookie("csrf_access_token");
      try {
        await fetch("http://localhost:5000/auth/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
        });
      } catch (err) {
        console.error("Logout error:", err);
      }

      // Always clear frontend
      setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
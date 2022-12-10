import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import { toast } from "react-toastify";

const AuthContext = createContext<any>(null);

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useSessionStorage("token", null);
  const navigate = useNavigate();

  const handleRegister = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      setToken(data.token);
      navigate("/");
    }
  };

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      setToken(data.token);
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setToken(null);
      }
    } catch (e) {
      toast("Error while trying to log you out", {
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

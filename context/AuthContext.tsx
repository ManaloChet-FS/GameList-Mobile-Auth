import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onSignUp?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_BASE = "http://192.168.50.19:8000/api/v1";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common['Authorization'] = token;

        setAuthState({
          token,
          authenticated: true
        })
      }
    }
    loadToken();
  }, [])

  const signup = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_BASE}/auth`, { email, password });
    } catch (error: any) {
      return { error: error.response.data.error }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/signin`, { email, password });

      setAuthState({
        token: res.data.token,
        authenticated: true
      });

      axios.defaults.headers.common['Authorization'] = res.data.token;

      await SecureStore.setItemAsync(TOKEN_KEY, res.data.token);

      return res;
    } catch (error: any) {
      switch (error.status) {
        case 400: {
          return { error: "Email and Password are required" };
        }
        case 401:
          return { error: "Invalid email or password" };
        default:
          console.log(error.status);
          return { error: "Unknown error has occurred" };
      }
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      token: null,
      authenticated: false
    });
  }

  const value = {
    onSignUp: signup,
    onLogin: login,
    onLogout: logout,
    authState
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
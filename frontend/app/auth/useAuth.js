import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";
import apiClient from "../apis/client";
export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken) => {
    const newUser = jwtDecode(authToken);
    console.log("authToken ",authToken," newUser ",newUser)
    setUser(newUser?.user);
    apiClient.setHeader('Authorization', `Bearer ${authToken}`);
    authStorage.storeToken(authToken);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const result = { user, logIn, logOut };
  return result;
}

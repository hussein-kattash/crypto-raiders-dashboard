export interface LoginInfo {
  username: string;
  password: string;
}
import { useState } from "react";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

export const useAuthentication = (loginInfo: LoginInfo) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = useSignIn();

  const adminLogin = () => {
    setLoading(true);
    apiClient
      .post("/login-admin", loginInfo)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("accessToken",res.data.token);
        if (
          signIn({
            token: res.data.token,
            expiresIn: 60,
            tokenType: "Bearer",
            authState:{username:loginInfo.username}
          })
        ) {
            navigate("/");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return { error, loading, adminLogin };
};

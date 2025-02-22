import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helpers/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.Slice";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;

      const response = await axios.post(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        },
        { withCredentials: true }
      );

      dispatch(setUser(response.data.user));
      showToast("success", response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
      showToast("error", error.response?.data?.message || error.message);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2"
      onClick={handleLogin}
    >
      <FcGoogle className="text-xl" />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;

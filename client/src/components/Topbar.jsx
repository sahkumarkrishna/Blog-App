import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import axios from "axios";
import logo from "../assets/images/logo.jpg";
import SearchBox from "./SearchBox";
import { RouteSignIn, RouteIndex } from "@/helpers/RouteName";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "../assets/images/user.avif";
import { FaUser, FaFolderPlus } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { removeUser } from "../redux/user/user.Slice";
import { getEnv } from "../helpers/getEnv";
import { showToast } from "../helpers/showToast";
import { Button } from "./ui/button";
const Topbar = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Ensure the correct endpoint is used
      await axios.post(`${getEnv("VITE_API_BASE_URL")}/auth/logout`);

      // ✅ Dispatch correct action to remove user from state
      dispatch(removeUser());

      showToast("success", "Logged out successfully");
      navigate(RouteIndex);
    } catch (error) {
      console.error("Logout Error:", error);
      showToast(error.message);
    }
  };

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div>
        <img src={logo} width={120} alt="Logo" />
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>
      <div>
        {!userState.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <IoLogInOutline className="mr-2" />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={userState.user?.avatar || userIcon}
                  alt="User Avatar"
                />
                <AvatarFallback>
                  {userState.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p>{userState.user?.name}</p>
                <p className="text-sm">{userState.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <FaUser className="mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/create-blog">
                  <FaFolderPlus className="mr-2" />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <MdLogout className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;

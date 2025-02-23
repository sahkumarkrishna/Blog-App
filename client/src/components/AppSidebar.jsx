import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { FaBlog, FaComment, FaUserTie } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { RouteCategoryDetails } from "@/helpers/RouteName";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} width={120} alt="Logo" />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <IoHome />
              <Link to="/">Home</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <BiSolidCategory />
              <Link to={RouteCategoryDetails}>Categories</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <FaBlog />
              <Link to="/">Blogs</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <FaComment />
              <Link to="/">Comments</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton>
              <FaUserTie />
              <Link to="/">Users</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Corrected SidebarGroup */}
        <div>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GoDotFill />
                <Link to="/">Category item</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

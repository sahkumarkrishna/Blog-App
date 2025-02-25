import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import {
  RouteAddCategory,
  // RouteCategoryDetails,
  // RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
  RouteCategories,
  RouteBlogAdd,
  RouteBlog,
} from "./helpers/RouteName";
import Index from "./pages/Index";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import AddBlog from "./pages/Blog/AddBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import EditBlog from "./pages/Blog/EditBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          {/*  Blog category */}
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path="/category/edit/:id" element={<EditCategory />} />
          {/* Blog */}
          <Route path={RouteBlogAdd} element={<AddBlog />} />
          <Route path={RouteBlog} element={<BlogDetails/>} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
          {/* ✅ Fixed */}
          <Route path={RouteCategories} element={<CategoryDetails />} />
        </Route>
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

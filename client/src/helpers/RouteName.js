export const RouteIndex = "/";
export const RouteSignIn = "/sign-in";
export const RouteSignUp = "/sign-up";
export const RouteProfile = "/profile";
export const RouteCategoryDetails = "/categories";
export const RouteAddCategory = "/category/add";
export const RouteEditCategory = (category_Id) => {
  if (category_Id) {
  return`/category/edit/${id}`;
  } else {
    return `/category/edit/category_Id`;
  }
};
export const RouteCategories = "/categories";

export const RouteBlog = "/blog";
export const RouteBlogAdd = "/blog/add";
export const RouteBlogEdit = (blogId)=>{
if (blogId) {
  return`/blog/edit/${id}`;
  } else {
    return `/blog/edit/:blogId`;
  }
};
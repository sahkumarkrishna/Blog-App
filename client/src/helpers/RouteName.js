export const RouteIndex = "/";
export const RouteSignIn = "/sign-in";
export const RouteSignUp = "/sign-up";
export const RouteProfile = "/profile";
export const RouteCategoryDetails = "/categories";
export const RouteAddCategory = "/category/add";
export const RouteEditCategory = (category_Id) => {
  if (category_Id) {
    return `/category/edit/${category_Id}`;
  } else {
    return `/category/edit/category_Id`;
  }
};
export const RouteCategories = "/categories";

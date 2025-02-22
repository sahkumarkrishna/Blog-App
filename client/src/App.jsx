import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import {
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
} from "./helpers/RouteName";
import Index from "./pages/Index";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          
          <Route path={RouteProfile} element={<Profile />}></Route>
        </Route>
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

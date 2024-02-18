import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import AddNewPost from "./pages/AddNewPost";
import PostDetails from "./pages/PostDetails";
import Ads from "./pages/Ads";
import AddAds from "./pages/AddNewAds";

import { RequireAuth } from "react-auth-kit";
import Team from "./pages/Team";
import AddNewMember from "./pages/AddNewMember";
import EditMember from "./pages/EditMember";
import AddNewPartner from "./pages/AddNewPartner";
import Partners from "./pages/Partners";

function App() {
  return (
    <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/posts"
          element={
            <RequireAuth loginPath="/login">
              <Posts />
            </RequireAuth>
          }
        />
        <Route
          path="/add-post"
          element={
            <RequireAuth loginPath="/login">
              <AddNewPost/>
            </RequireAuth>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <RequireAuth loginPath="/login">
              <PostDetails/>
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        ></Route>
         <Route
          path="/ads"
          element={
            <RequireAuth loginPath="/login">
              <Ads/>
            </RequireAuth>
          }
        ></Route>
         <Route
          path="/add-ads"
          element={
            <RequireAuth loginPath="/login">
              <AddAds/>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/team"
          element={
            <RequireAuth loginPath="/login">
              <Team/>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/add-member"
          element={
            <RequireAuth loginPath="/login">
              <AddNewMember/>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/edit-member/:id"
          element={
            <RequireAuth loginPath="/login">
              <EditMember/>
            </RequireAuth>
          }
        ></Route>
         <Route
          path="/add-partner"
          element={
            <RequireAuth loginPath="/login">
              <AddNewPartner/>
            </RequireAuth>
          }
        ></Route>
         <Route
          path="/partners"
          element={
            <RequireAuth loginPath="/login">
              <Partners/>
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import React, { useEffect } from "react";
import Login from "./Components/Login";
import Blogs from "./Components/Blogs";
import UserBlogs from "./Components/UserBlog";
import AddBlog from "./Components/AddBlog";
import BlogDetail from "./Components/BlogDeatil";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;

// https://blog-writing-app.netlify.app/
// https://blog-writing-app.netlify.app/

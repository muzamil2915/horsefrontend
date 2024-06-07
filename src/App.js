import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Calculate from "./Components/Calculate";
import Class from "./Components/Class";
import FeedData from "./Components/FeedData";
import Home from "./Components/Home";
import Horse from "./Components/Horse";
import Jockey from "./Components/Jockey";
import Sidebar from "./Components/Sidebar";
import SignIn from "./Components/SignIn";
import ChangePassword from "./Manage/ChangePassword";
import SignOut from "./Manage/SignOut";
import Detail from "./Components/Detail";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "./redux/userSlice";

function App() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  return (
    <Router>
      <div className="App">
        {token ? (
          <>
            <Sidebar />
            <Routes>
              <Route path="/class" element={<Class />} />
              <Route path="/home" element={<Home />} />
              <Route path="/feeddata" element={<FeedData />} />
              <Route path="/calculate" element={<Calculate />} />
              <Route path="/ChangePassword" element={<ChangePassword />} />
              <Route path="/horse" element={<Horse />} />
              <Route path="/jockey" element={<Jockey />} />
              <Route path="/detail" element={<Detail/>} />
              <Route
                path="/signOut"
                element={
                  <SignOut
                    onSignOut={() => {
                      dispatch(signOut());
                    }}
                  />
                }
              />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import SavedPosts from "./components/Feed/SavedPosts";
import SavedSubreddits from "./components/Feed/SavedSubreddits";
import Wall from "./components/Feed/Wall";

function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route index element={<Wall />} />
          <Route path="saved-posts" element={<SavedPosts />} />
          <Route path="saved-subreddits" element={<SavedSubreddits />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

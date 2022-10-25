import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect } from "react";
import { useState } from "react";
import uuid from "react-uuid";
import { useLocalStorage, useToggle } from "../../services/hooks/customHooks";
import { FeedCard } from "./FeedCard";

export default function SavedPosts() {
  const [savedPosts, setSavedPosts] = useLocalStorage("savedPosts", []);
  const [refreshPosts, setRefreshPosts] = useState();

  useEffect(() => {
    document.title = "Saved Posts - Scroll";
  }, [refreshPosts]);

  return (
    <div>
      <h2 className="text-3xl my-5 ">Your Saved Posts</h2>
      <div className=" bg-[#212426] w-full h-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {savedPosts ? (
          savedPosts.map((post) => (
            <FeedCard
              key={uuid()}
              title={post.title}
              image={post.image}
              video={post.video}
              blur={post.nsfw}
              id={post.id}
              post={post}
              setRefreshPosts={setRefreshPosts}
            />
          ))
        ) : (
          <ProgressSpinner />
        )}
      </div>
    </div>
  );
}

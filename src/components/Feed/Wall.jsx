import React, { useEffect, useState, useRef } from "react";
import { DebounceInput } from "react-debounce-input";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import uuid from "react-uuid";
import { getPostsBySubreddit } from "../../services/api/Feed";
import { FeedCard } from "./FeedCard";
import MediaViewer from "../Reusable/MediaViewer/MediaViewer";

export default function Wall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [subreddit, setSubreddit] = useState("popular");
  const [postAfter, setPostAfter] = useState("");
  const [postBefore, setPostBefore] = useState("");
  const [toggleImageViewer, setToggleImageViewer] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPostsBySubreddit(subreddit, 60, postBefore, postAfter)
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => setError(`Sorry we couldn't find what you were looking for in r/${subreddit}: ${err.message}`))
      .finally(() => setLoading(false));
  }, [subreddit, postAfter, postBefore]);

  useEffect(() => {
    setPostAfter("");
    setPostBefore("");
  }, [subreddit]);

  const handleNext = () => {
    setPostAfter(posts[posts.length - 1].name);
    setPostBefore("");
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const handlePrev = () => {
    setPostBefore(posts[0].name);
    setPostAfter("");
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <Button
        label="Open Gallery"
        icon="pi pi-external-link"
        onClick={() => setToggleImageViewer(true)}
        className="fixed bottom-0 right-0 m-5 z-50"
      />
      <MediaViewer show={toggleImageViewer} onHide={() => setToggleImageViewer(false)} images={posts?.filter((post) => post.image.length > 0)} />
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        className="w-full p-3  rounded-md outline-none text-gray-700"
      />
      {loading && <ProgressSpinner />}
      {error && <p>{error}</p>}
      <div className=" bg-[#212426] w-full h-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {posts ? (
          posts.map((post) => (
            <FeedCard
              key={uuid()}
              title={post.title}
              image={post.image}
              video={post.video}
              blur={post.nsfw}
              id={post.id}
              subreddit={subreddit}
              post={post}
            />
          ))
        ) : (
          <ProgressSpinner />
        )}
      </div>

      <div className="w-full flex gap-2">
        <Button label="Prev" className="  w-3/6" onClick={handlePrev} />
        <Button label="Next" className=" w-3/6" onClick={handleNext} />
      </div>
    </div>
  );
}

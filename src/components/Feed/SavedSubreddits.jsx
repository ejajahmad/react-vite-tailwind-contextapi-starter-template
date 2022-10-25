import React, { useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import uuid from "react-uuid";
import { useLocalStorage } from "../../services/hooks/customHooks";
import { useNavigate } from "react-router-dom";
import { getSubredditDetails } from "../../services/api/Feed";
import { useState } from "react";

export default function SavedSubreddits() {
  const [savedSubreddits, setSavedSubreddits] = useLocalStorage("savedSubreddits", []);

  useEffect(() => {
    document.title = "Saved Posts - Scroll";
  }, [savedSubreddits]);

  return (
    <div className="p-3">
      <h2 className="text-3xl my-5 text-center sm:text-left ">Your Subreddits</h2>
      <div className=" bg-[#212426] w-full h-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {savedSubreddits && savedSubreddits.length > 0 ? (
          savedSubreddits.map((subreddit) => <SubredditCard key={uuid()} subreddit={subreddit} savedSubreddits={savedSubreddits} />)
        ) : (
          <p>Uh oh! You haven't saved any subreddits yet.</p>
        )}
      </div>
    </div>
  );
}

const SubredditCard = ({ subreddit }) => {
  const [savedSubreddits, setSavedSubreddits] = useLocalStorage("savedSubreddits", []);
  const [bgImage, setBgImage] = useState("");
  const navigate = useNavigate();

  const handleBookmarkSubreddit = (subreddit) => {
    // Check if post is bookmark
    const filteredSubreddits = savedSubreddits.filter((item) => item === subreddit);

    if (filteredSubreddits.length > 0) {
      setSavedSubreddits(savedSubreddits.filter((item) => item !== subreddit));
    } else {
      setSavedSubreddits([...savedSubreddits, subreddit]);
    }
  };

  useEffect(() => {
    getSubredditDetails(subreddit)
      .then((data) => {
        setBgImage(data);
      })
      .catch((err) => console.warn(err));
  }, [subreddit, savedSubreddits]);

  return (
    <div
      className="  text-black  cursor-pointer  shadow-md relative "
      // style={{
      //   backgroundImage: `url(${bgImage})`,
      //   backgroundSize: "contain",
      //   backgroundBlendMode: "multiply",
      // }}
    >
      <i
        className={`pi pi-${savedSubreddits.includes(subreddit) ? "star-fill" : "star"}  z-50 absolute left-0 top-0 m-4 `}
        onClick={() => handleBookmarkSubreddit(subreddit)}
      ></i>
      <div onClick={() => navigate(`/?subreddit=${subreddit}`)} className="  bg-white  w-full h-full flex items-center justify-center">
        <p className="text-2xl font-semibold z-10 ">{subreddit}</p>
      </div>
      <img src={bgImage} alt="" className="w-full h-full object-contain absolute top-0 left-0 opacity-10  " />
    </div>
  );
};

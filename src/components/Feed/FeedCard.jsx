import React, { useEffect, useState, useRef } from "react";
import useIsInViewport from "../../services/hooks/useIsInViewport";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Badge } from "primereact/badge";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import uuid from "react-uuid";
import { getCommentsBySubredditPostId, getPostsBySubreddit } from "../../services/api/Feed";
import parse from "html-react-parser";

export function FeedCard({
  post,
  id,
  subreddit,
  title,
  subTitle,
  image = "https://diy-magazine.s3.amazonaws.com/d/diy/Artists/G/Girl-In-red/Girl-in-Red_-by-Chris-Almeida-1.png",
  video = "",
  blur = false,
}) {
  const [blurToggle, setBlurToggle] = useState(blur);
  const [videoToggle, setVideoToggle] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentToggle, setCommentToggle] = useState(false);
  const cardRef = useRef();
  const videoRef = useRef();
  const isInViewport = useIsInViewport(cardRef);

  useEffect(() => {
    if (!isInViewport && blur) {
      setBlurToggle(true);
    }
  }, [isInViewport]);

  useEffect(() => {
    if (commentToggle) {
      getCommentsBySubredditPostId(subreddit, id).then((data) => setComments(data));
    }
  }, [subreddit, id, commentToggle]);

  return (
    <Card
      ref={cardRef}
      title={title}
      subTitle={subTitle}
      header={
        image || video ? (
          <div className="relative">
            {video.length > 0 ? (
              <video ref={videoRef} src={video}></video>
            ) : post.youtube ? (
              <div></div>
            ) : (
              <Image src={image} alt="Image Text" className=" object-contain " />
            )}
            <div className="text-white z-10 absolute top-0 right-0 m-5 flex flex-col items-center gap-4 bg-[#0000007d] backdrop-blur-3xl  w-max h-max p-2 rounded-md ">
              <i className="pi pi-comments cursor-pointer " onClick={() => setCommentToggle(true)}></i>
              <i
                className={`pi pi-${blurToggle ? "eye" : "eye-slash"} cursor-pointer  `}
                onClick={() => {
                  setBlurToggle(!blurToggle);
                }}
              ></i>
              {video && (
                <i
                  className={`pi pi-${videoToggle ? "pause" : "play"} cursor-pointer  `}
                  onClick={() => {
                    setVideoToggle(!videoToggle);
                    if (videoToggle === false) {
                      videoRef.current.play();
                    } else {
                      videoRef.current.pause();
                    }
                  }}
                ></i>
              )}
            </div>
            {blurToggle && <div className="absolute  top-0 left-0 w-full h-full bg-transparent backdrop-blur-3xl "></div>}
          </div>
        ) : (
          ""
        )
      }
      footer={
        <>
          <div className="flex items-center">{blur && <Badge value="NSFW"></Badge>}</div>
          <div className="flex items-center">
            <div className=" flex items-center gap-2  border-none  px-2 py-1 rounded ">
              <i className="pi pi-heart  "></i>
              <p>{post.likeability * 100}% People like this</p>
            </div>
          </div>

          <Dialog header="Comments" style={{ width: "90vw" }} position="bottom" visible={commentToggle} onHide={() => setCommentToggle(false)}>
            <div className="flex flex-col gap-5 w-full h-full">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div className="border border-gray-200 bg-gray-100 p-3 " key={uuid()}>
                    <p className=" font-semibold italic">@{comment.author}</p>
                    <p
                      className="  overflow-clip "
                      key={uuid()}
                      dangerouslySetInnerHTML={{
                        __html: comment.body,
                      }}
                    ></p>
                  </div>
                ))
              ) : (
                <ProgressSpinner />
              )}
            </div>
          </Dialog>
        </>
      }
    ></Card>
  );
}

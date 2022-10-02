import axios from "axios";

const getPostsBySubreddit = async (subreddit = "popular", limit = 20, before = "", after = "") => {
  const data = await axios.get(`https://www.reddit.com/r/${subreddit}.json?limit=${limit}&after=${after}&before=${before}`);
  // console.log(
  //   "FEED",
  //   data.data.data.children
  //     .map((items) => items.data)
  //     .map((item) => item)
  //     .filter((item) => item.preview || item.media)
  // );
  return data.data.data.children
    .map((items) => items.data)
    .filter((item) => item.preview || item.media)
    .map((item) => ({
      id: item?.id,
      name: item?.name,
      title: item.title,
      created: item?.created_utc,
      youtube: item?.media?.oembed?.html ? item.media.oembed.html : null,
      is_video: item?.is_video,
      image: item?.preview?.images[0]?.resolutions
        ? item?.preview?.images[0]?.resolutions[item?.preview?.images[0]?.resolutions.length - 1].url.replaceAll("&amp;", "&")
        : "",
      subreddit: item?.subreddit,
      likeability: item?.upvote_ratio,
      video: item.reddit_video
        ? item.reddit_video.fallback_url
        : item?.preview?.reddit_video_preview
        ? item?.preview?.reddit_video_preview?.fallback_url
        : "",
      source: item?.preview?.reddit_video_preview ? item?.preview?.reddit_video_preview.fallback_url : item?.preview?.images[0]?.resolutions,
      nsfw: item?.over_18,
    }));
};

const getCommentsBySubredditPostId = async (subreddit, id) => {
  const data = await axios.get(`https://www.reddit.com/r/${subreddit}/comments/${id}.json`);
  console.log(
    data.data
      .map((item) => item.data)
      .map((item) => item.children)
      .flatMap((item) => item)
      .map((item) => item.data)
  );
  return data.data
    .map((item) => item.data)
    .map((item) => item.children)
    .flatMap((item) => item)
    .map((item) => item.data);
};
export { getPostsBySubreddit, getCommentsBySubredditPostId };

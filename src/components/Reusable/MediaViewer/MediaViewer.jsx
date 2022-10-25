import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";
import { saveAs } from "file-saver";

import React, { useEffect } from "react";
import { FeedCard } from "../../Feed/FeedCard";

export default function MediaViewer({ show, onHide, images }) {
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "430px",
      numVisible: 2,
    },
    {
      breakpoint: "320px",
      numVisible: 1,
    },
  ];

  useEffect(() => {
    console.log(images);
  }, [images]);

  const itemTemplate = (post) => {
    return (
      <div className="">
        {/* <Button
          onClick={() => saveAs(item.image.replace("preview", "i").split("?")[0], item.title)}
          icon="pi pi-arrow-circle-down"
          className="absolute top-0 left-0 m-5"
        /> */}
        <FeedCard title={post.title} image={post.image} video={post.video} blur={post.nsfw} id={post.id} post={post} />
        {/* <img src={item.image} onError={(e) => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")} /> */}
      </div>
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <div className="w-20 h-20  ">
        <img
          src={item.image}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")}
        />
      </div>
    );
  };
  return (
    <Dialog style={{ width: "95vw", height: "90vh" }} visible={show} onHide={onHide}>
      <Galleria
        value={images}
        numVisible={10}
        item={itemTemplate}
        responsiveOptions={responsiveOptions}
        thumbnailsPosition="top"
        thumbnail={thumbnailTemplate}
      ></Galleria>
    </Dialog>
  );
}

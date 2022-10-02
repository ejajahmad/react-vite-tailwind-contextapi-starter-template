import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Galleria } from "primereact/galleria";
import { saveAs } from "file-saver";

import React, { useEffect } from "react";
import { FeedCard } from "../../Feed/FeedCard";

export default function MediaViewer({ show, onHide, images }) {
  useEffect(() => {
    console.log(images);
  }, [images]);

  const itemTemplate = (item) => {
    return (
      <div className="  flex flex-col items-center justify-center overflow-hidden mt-10 relative">
        {console.log(item.image.replace("preview", "i").split("?"))}
        <Button
          onClick={() => saveAs(item.image.replace("preview", "i").split("?")[0], item.title)}
          icon="pi pi-arrow-circle-down"
          className="absolute top-0 left-0 m-5"
        />
        <img src={item.image} onError={(e) => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")} />
      </div>
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <>
        <img
          src={item.image}
          className=" max-h-20"
          onError={(e) => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")}
        />
      </>
    );
  };
  return (
    <Dialog style={{ width: "95vw", height: "90vh" }} visible={show} onHide={onHide}>
      <Galleria value={images} numVisible={10} item={itemTemplate} thumbnailsPosition="top" thumbnail={thumbnailTemplate}></Galleria>
    </Dialog>
  );
}

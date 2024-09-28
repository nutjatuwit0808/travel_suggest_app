import React, { useEffect, useState } from "react";
import classes from "./TripItem.module.css";

function TripItem({ title, eid, url, description, photos = [], tags = [] }) {
  let [mainImg, setMainImg] = useState("");
  let [subImg, setSubImg] = useState([]);

  useEffect(() => {
    //check if photo more than 1
    if (photos.length > 0) {
      //get first photo and set main photo
      let mainImage = photos.shift();
      if (mainImage) setMainImg(mainImage);

      //set sub photo
      if (photos.length > 0) setSubImg(photos);
    }
  }, []);

  const handleClickTopic = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={classes.tripItemContainer}>
      <div className={classes.mainImgWrapper}>
        <img src={mainImg} alt="" srcSet="" width={"100%"} height={"100%"} />
      </div>
      <div className={classes.mainContentWrapper}>
        <div className={classes.mainContent}>
          <h3 onClick={handleClickTopic}>{title}</h3>
          <div className={classes.descriptionWrapper}>
            <div className={classes.description}>
              <p>{description}</p>
              <a href={url} target="blank">
                อ่านต่อ
              </a>
            </div>
            <div className={classes.tagWrapper}>
              <p>หมวด</p>
              <div className={classes.tags}>
                {tags.map((item, index) => {
                  return (
                    <a key={index} href={`?keyword=${item}`} title={item}>
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.subImgWrapper}>
          {subImg.map((item, index) => {
            return (
              <div key={index} className={classes.imgItem}>
                <img
                  src={item}
                  alt=""
                  srcSet=""
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TripItem;

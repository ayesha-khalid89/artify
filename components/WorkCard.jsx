import React, { useState } from "react";
import "@styles/WorkCard.scss";
import {
  ArrowBackIos,
  ArrowBackIosNew,
  ArrowForwardIos,
  Delete,
  FavoriteBorder,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const WorkCard = ({ work }) => {
  const {data:session} = useSession();
  const userId=session?.user?._id;
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % work.workPhotoPaths.length);
  };
  const goToPrevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + work.workPhotoPaths.length) % work.workPhotoPaths.length
    );
  };

  //Delete work
  const handleDelete = async () => {
    const hasConfirm = confirm("Are you sure?");
    if (hasConfirm) {
      try {
        await fetch(`api/work/${work._id}`, { method: "DELETE" });
        window.location.reload()
      } catch (err) {
        console.log("Deletion error");
      }
    }
  };
  return (
    <div
      className="work-card"
      onClick={() => {
        router.push(`/work-details?id=${work._id}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {work.workPhotoPaths?.map((photo, index) => (
            <div className="slide" key={index}>
              <img src={photo} alt="work" />
              <div className="prev-button" onClick={(e) => goToPrevSlide(e)}>
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div className="next-button" onClick={(e) => goToNextSlide(e)}>
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="info">
        <div>
          <h3>{work.title}</h3>
          <div className="creator">
            <img src={work.creator.profileImagePath} alt="profileImage" />
            <span>{work.creator.userName}</span> in <span>{work.category}</span>
          </div>
        </div>
        <div className="price">$ {work.price}</div>
      </div>
      {userId === work?.creator._id ? (
        <div
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete()
          }}
        >
          <Delete
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "5px",
              fontSize: "30px",
            }}
          />
        </div>
      ) : (
        <div className="icon">
          <FavoriteBorder
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "5px",
              fontSize: "30px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WorkCard;

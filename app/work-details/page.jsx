"use client";

import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Edit,
  Favorite,
  FavoriteBorder,
  More,
  ShoppingCart,
} from "@mui/icons-material";
import "@styles/WorkDetails.scss";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const WorkDetails = () => {
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState({});
  const searchParams = useSearchParams();
  const workId = searchParams.get("id");
  const { data: session, update } = useSession();

  useEffect(() => {
    const getWorkDetails = async () => {
      const response = await fetch(`api/work/${workId}`, {
        method: "GET",
      });
      const data = await response.json();
      setWork(data);
      setLoading(false);
    };
    if (workId) {
      getWorkDetails();
    }
  }, [workId]);

  const userId = session?.user?._id;

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
  //show more photos
  const [visiblePhotos, setVisiblePhotos] = useState(5);
  const loadMorePhotos = () => {
    setVisiblePhotos(work.workPhotoPaths.length);
  };
  const router = useRouter();

  const wishList = session?.user?.wishList;

  const isLiked = wishList?.find((item) => item?._id === work._id);
  const patchWishList = async () => {
    if(!session?.user){
      return
    }
    const response = await fetch(`api/user/${userId}/wishlist/${work._id}`, {
      method: "PATCH",
    });
    const data = await response.json();
    update({ user: { wishList: data.wishList } });
  };

  //add to cart
  const cart = session?.user?.cart;

  const isInCart = cart?.find((item) => item.workId === workId);
  const addToCart = async () => {
    const newCartItem = {
      workId,
      image: work.workPhotoPaths[0],
      title: work.title,
      category: work.category,
      creator: work.creator,
      price: work.price,
      quantity: 1,
    };
    if (!isInCart) {
      const newCart = [...cart, newCartItem];
      try {
        await fetch(`/api/user/${userId}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: newCart }),
        });
        update({user:{cart:newCart}})
      } catch (err) {
        console.log(err)
      }
    }
    else{
      confirm("This item is already in cart!")
      return
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="work-details">
        <div className="title">
          <h1>{work.title}</h1>
          {work?.creator?._id === userId ? (
            <div
              className="save"
              onClick={() => {
                router.push(`/update-work?id=${workId}`);
              }}
            >
              <Edit />
              <p>Edit</p>
            </div>
          ) : (
            <div className="save" onClick={patchWishList} >
              {isLiked ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteBorder />
              )}
              <p>Save</p>
            </div>
          )}
        </div>
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
        <div className="photos">
          {work.workPhotoPaths?.slice(0, visiblePhotos).map((photo, index) => (
            <img
              src={photo}
              alt="work"
              key={index}
              onClick={() => {
                setCurrentIndex(index);
              }}
              className={currentIndex === index ? "selected" : ""}
            />
          ))}
          {visiblePhotos < work.workPhotoPaths.length && (
            <div className="show-more" onClick={loadMorePhotos}>
              <ArrowForwardIos sx={{ fontSize: "40px" }} />
              Show More
            </div>
          )}
          {visiblePhotos > 5 &&
            visiblePhotos === work.workPhotoPaths.length && (
              <div
                className="show-more"
                onClick={() => {
                  setVisiblePhotos(5);
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "40px" }} />
                Show Less
              </div>
            )}
        </div>
        <hr />
        <div className="profile">
          <img src={work.creator.profileImagePath} alt="profile"  onClick={()=> router.push(`/shop?id=${work.creator._id}`)}/>
          <h3>Created by {work.creator.userName}</h3>
        </div>

        <hr />
        <h3>About this product</h3>
        <p>{work.description}</p>
        <h1>${work.price}</h1>
        <button type="submit" onClick={addToCart} disabled={!session?.user}>
          <ShoppingCart />
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default WorkDetails;

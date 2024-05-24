"use client";
import { categories } from "@data";
import WorkList from "./WorkList";
import { useEffect, useState } from "react";
import "@styles/Categories.scss";
import Loader from "./Loader";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [workList, setWorkList] = useState([]);
  const getWorkList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/work/list/${selectedCategory}`);
      const data = await response.json();
      setWorkList(data);
      setLoading(false);
    } catch (err) {
      console.log("error in loading worklist");
    }
  };

  useEffect(() => {
    getWorkList();
  }, [selectedCategory]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="categories">
        {categories?.map((item) => (
          <p
            onClick={() => {
              setSelectedCategory(item);
            }}
            className={`${selectedCategory === item ? "selected" : ""}`}
          >
            {item}
          </p>
        ))}
      </div>
      <WorkList data={workList} />
    </>
  );
};

export default Feed;

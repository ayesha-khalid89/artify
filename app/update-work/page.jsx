"use client";
import Form from "@components/Form";
import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateWork = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const workId = searchParams.get("id");
  const router=useRouter()
  const [work, setWork] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });

  useEffect(() => {
    const getWorkDetails = async () => {
      const response = await fetch(`api/work/${workId}`, {
        method: "GET",
      });
      const data = await response.json();
      setWork({
        category: data.category,
        title: data.title,
        description: data.description,
        price: data.price,
        photos: data.workPhotoPaths,
      });
      setLoading(false);
    };
    if (workId) {
      getWorkDetails();
    }
  }, [workId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateWorkForm = new FormData();
      for (var key in work) {
        updateWorkForm.append(key, work[key]);
      }
      work.photos.forEach((photo) => {
        updateWorkForm.append("workPhotoPaths", photo);
      });
      const response = await fetch(`/api/work/${workId}`, {
        method: "PATCH",
        body: updateWorkForm,
      });
      if(response.ok){
        router.push(`/shop?id=${session?.user?._id}`)
      }
    } catch (err) {console.log("Update work failed",err.message)}
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Form
        type="Edit"
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default UpdateWork;

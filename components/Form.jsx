import React from "react";
import "@styles/Form.scss";
import { categories } from "@data";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
const Form = ({ type, work, setWork, handleSubmit }) => {
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setWork((prev) => {
      return {
        ...prev,
        photos: [...prev.photos, ...newPhotos],
      };
    });
  };
  const handleRemovePhoto = (indexToRemove) => {
    setWork((prev) => {
      return {
        ...prev,
        photos: prev.photos.filter((_, index) => index !== indexToRemove),
      };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWork((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="form">
      <h1>{type} Your Work</h1>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Which of these categories best decsribe your work?</h3>
        <div className="category-list">
          {categories.map((item, index) => (
            <p
              key={index}
              className={`${work.category === item ? "selected" : ""} `}
              onClick={() => {
                setWork({
                  ...work,
                  category: item,
                });
              }}
            >
              {item}
            </p>
          ))}
        </div>
        <h3>Add some photos of your work</h3>
        {work.photos.length < 1 && (
          <div className="photos">
            <input
              id="image"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadPhotos}
              multiple
            />
            <label htmlFor="image" className="alone">
              <div className="icon">
                <IoIosImages />
              </div>
              <p>Upload from your device</p>
            </label>
          </div>
        )}
        {work.photos.length > 0 && (
          <>
            <div className="photos">
              {work.photos.map((photo, index) => (
                <div className="photo" key={index}>
                  {photo instanceof Object ? (
                    <img src={URL.createObjectURL(photo)} alt="work" />
                  ) : (
                    <img src={photo} alt="work" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <BiTrash />
                  </button>
                </div>
              ))}

              <input
                id="image"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleUploadPhotos}
                multiple
              />
              <label htmlFor="image" className="together">
                <div className="icon">
                  <IoIosImages />
                </div>
                <p>Upload from your device</p>
              </label>
            </div>
          </>
        )}
        <h3>What makes your work attractive?</h3>
        <div className="description">
          <p>Title</p>
          <input
            type="text"
            placeholder="Title"
            onChange={handleChange}
            value={work.title}
            name="title"
            required
          />
          <p>Description</p>
          <textarea
            type="text"
            placeholder="Description"
            onChange={handleChange}
            value={work.description}
            name="description"
            required
          />
          <p>Now, set the PRICE!</p>
          <span>$</span>
          <input
          className="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
            value={work.price}
            name="price"
            required
          />
        </div>
        <button type="submit" className="submit_btn">Publish Your Work</button>
      </form>
    </div>
  );
};

export default Form;

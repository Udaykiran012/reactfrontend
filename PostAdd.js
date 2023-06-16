import React, { useState } from "react";

const PostAdd = (props) => {
  console.log(props);
  //   const [formData, setFormData] = useState({
  //     title: "",
  //     description: "",
  //   });

  //   const handleInputChange = (event) => {
  //     setFormData({
  //       ...formData,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  //   const handlePostSubmit = async (event) => {
  //     event.preventDefault();

  //     const { title, description } = formData;

  //     const response = await fetch("http://localhost:3000/posts", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title,
  //         description,
  //       }),
  //     });

  //     const responseData = await response.json();
  //     console.log(responseData);
  //   };

  return (
    <form onSubmit={props.handlePostSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={props.postformData.title}
        onChange={props.handleInputChange2}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={props.postformData.description}
        onChange={props.handleInputChange2}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PostAdd;
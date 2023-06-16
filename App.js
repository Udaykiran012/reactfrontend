import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Post from "./Post";
import PostAdd from "./PostAdd";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [postformData, setPostFormData] = useState({
    title: "",
    description: "",
  });

  const [catData, setCatData] = useState([]);
  const [postData, setPostData] = useState([]);

  const handleInputChange2 = (event) => {
    setPostFormData({
      ...postformData,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputChange1 = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // const handlePostSubmit = async (event) => {
  //   event.preventDefault();

  //   const response = await fetch("http://localhost:3000/posts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       title: "Uday Profile Pic",
  //       description: "Uday anna model",
  //       // job: "Uday Bannu Tiktok star boltey bantai",
  //     }),
  //   });
  //   const responseData = await response.json();
  //   console.log(responseData);
  // };
  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const { title, description } = postformData;

    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    getPostData();
  };

  const getPostData = async () => {
    const data = await fetch("http://localhost:3000/posts");
    const datajson = await data.json();
    setPostData(datajson);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/cats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Madarchod",
        age: 2002,
        job: "Uday Bannu Tiktok star boltey bantai",
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
  };

  const getData = async () => {
    const data = await fetch("http://localhost:3000/cats");
    const datajson = await data.json();
    setCatData(datajson);
    console.log(catData.length);
  };

  const getRestaurantData = async (apiUrl) => {
    const restaurantDataFromApi = await fetch(apiUrl);
    const restaurantDataFromApiJson = await restaurantDataFromApi.json();
    console.log(restaurantDataFromApiJson);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange1}
        />

        <button type="submit">Submit</button>
      </form>

      <PostAdd
        postformData={postformData}
        handlePostSubmit={handlePostSubmit}
        handleInputChange2={handleInputChange2}
      />

      <button type="submit" onClick={getData}>
        Get Data
      </button>
      <button
        type="submit"
        onClick={() => {
          getRestaurantData(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4436497&lng=78.4458259&page_type=DESKTOP_WEB_LISTING"
          );
        }}
      >
        Get Data Swiggy
      </button>
      {/* <button type="submit" onClick={handlePostSubmit}>
        Submit pOst Data
      </button> */}
      <button type="submit" onClick={getPostData}>
        Get Post Data
      </button>

      {console.log(catData.length)}
      {catData.length ? (
        <>
          {catData.map((data) => {
            return (
              <div>
                <h1>id {data.id}</h1>
                <h1>name {data.name}</h1>
                <h1>age {data?.age}</h1>
                <h1>job {data?.job}</h1>
                <h1>created_at {data.created_at}</h1>
                <h1>updated_at {data.updated_at}</h1>
              </div>
            );
          })}
        </>
      ) : (
        <h2>loading</h2>
      )}
      <h1>The total Number of posts are: {postData.length}</h1>
      <h1>Post Data Displayed Below: </h1>
      {postData.length ? (
        <>
          {postData.map((post) => {
            return <Post props={post} />;
          })}
        </>
      ) : (
        <>none</>
      )}
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
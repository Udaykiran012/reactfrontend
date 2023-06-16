import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";

const DataStringData = (str) => {
  const dateObj = new Date(str);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();

  return [date, month, year];
};

import "./Post.css";

const Post = ({ props }) => {
  const [formData, setFormData] = useState({
    likeable_type: "post",
    likeable_id: props.id,
  });

  console.log(props);
  const [postDate, postMonth, postYear] = DataStringData(props.created_at);
  const [postDateU, postMonthU, postYearU] = DataStringData(props.updated_at);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    getLikeforPost();
  }, []);

  const getLikeforPost = async () => {
    const likesData = await fetch(
      `http://localhost:3000/likes?post_id=${props.id}`
    );
    const likesDataResponse = await likesData.json();
    setLikeCount(likesDataResponse.length);
  };

  const handleLike = async (event) => {
    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setLiked(true);
    }

    event.preventDefault();

    const { likeable_type, likeable_id } = formData;

    const response = await fetch("http://localhost:3000/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: props.id,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    // const likesData = await fetch(
    //   `http://localhost:3000/likes?post_id=${props.id}`
    // );
    // const likesDataResponse = await likesData.json();
    // setLikeCount(likesDataResponse.length);
    getLikeforPost();
    // console.log(likesDataResponse);
  };

  const handleComment = () => {
    setCommentCount(commentCount + 1);
  };

  return (
    <div className="post_container">
      <h1>Title: {props.title}</h1>
      <h1>Description: {props.description}</h1>
      <h1>
        Created On: {postDate} / {postMonth} / {postYear}
      </h1>
      <h1>
        Updated On: {postDateU} / {postMonthU} / {postYearU}
      </h1>
      <div className="social_buttons">
        <button onClick={handleLike}>{liked ? "Unlike" : "Like"}</button>
        <button onClick={handleComment}>Comment</button>
      </div>
      <div className="social_counts">
        <p>Likes: {likeCount}</p>
        <p>Comments: {commentCount}</p>
      </div>
    </div>
  );
};

export default Post;
import React, { createContext, useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import axios from 'axios'

export const ApiContext = createContext();

const ApiContextProvider = (props) => {

  const token = props.cookies.get("current-token");
  const [requestUser, setRequestUser] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [onePost, setOnePost] = useState([]);
  const [onePostLikeList, setOnePostLikeList] = useState([]);
  const [followList, setFollowList] = useState([]);
  const API_BASE_URL = 'http://127.0.0.1:8000/api/v1'

  useEffect(() => {
    const getRequestUser = async () => {
      try {
        const res = await axios.get(
          API_BASE_URL + "/request-user/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        res.data[0] && setRequestUser(res.data[0]);
      }
      catch {
        console.log("error");
      }
    }

    const getFollowList = async () => {
      try {
        const res = await axios.get(
          API_BASE_URL + "/request-user/connections/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setFollowList(res.data[0].following);
      }
      catch {
        console.log("error");
      }
    }

    getRequestUser();
    getFollowList();
  }, [token, requestUser.id]);

  const getAllPosts = async () => {
    try {
      const res = await axios.get(
        API_BASE_URL + "/posts/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setAllPosts(res.data);
    }
    catch {
      console.log("error");
    }
  }

  const getOnePost = async (id) => {
    try {
      const res = await axios.get(
        API_BASE_URL + `/posts/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setOnePost(res.data);
    }
    catch {
      console.log("error");
    }
  }

  const getOnePostLikeList = async (id) => {
    try {
      const res = await axios.get(
        API_BASE_URL + `/posts/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setOnePostLikeList(res.data.like);
    }
    catch {
      console.log("error");
    }
  }

  const createNewPost = async (title, content, userId) => {
    const createData = new FormData();
    createData.append("title", title);
    createData.append("content", content);
    createData.append("user", userId);
    try {
      await axios.post(
        API_BASE_URL + '/posts/',
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      window.location.href = "/"
    }
    catch {
      console.log("error");
    }
  }

  const toggleOneUserFollow = async (post_id) => {
    try {
      await axios.get(
        API_BASE_URL + `/follow/${post_id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    }
    catch {
      console.log("error");
    }
  }

  const toggleOnePostLike = async (post_id) => {
    try {
      await axios.get(
        API_BASE_URL + `/like/${post_id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      getOnePost(post_id);
      getOnePostLikeList(post_id);
    }
    catch {
      console.log("error");
    }
  }

  return (
    <ApiContext.Provider
      value={{
        requestUser,
        followList,
        allPosts,
        onePost,
        onePostLikeList,
        getAllPosts,
        createNewPost,
        getOnePost,
        getOnePostLikeList,
        toggleOnePostLike,
        toggleOneUserFollow,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default withCookies(ApiContextProvider)

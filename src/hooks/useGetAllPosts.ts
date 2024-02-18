import { useContext, useState } from "react";
import apiClient from "../services/api-client";
import { PostsContext } from "../context/PostsContext";

export class PostResponse {
  _id: string = "";
  title: {
    ar: string;
    en: string;
    ru: string;
  } = { ar: "", en: "", ru: "" };
  content: {
    ar: string;
    en: string;
    ru: string;
  } = { ar: "", en: "", ru: "" };
  category: {
    ar: string[];
    en: string[];
    ru: string[];
  } = { ar: [], en: [], ru: [] };
  image: string = "";
  createdAt: string = "";
  updatedAt: string = "";
}

export const useGetAllPosts = () => {
  const { setPosts } = useContext(PostsContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function getAllPost() {
    setLoading(true);
    apiClient
      .get<PostResponse[]>("/get-posts")
      .then((res) => {
        setPosts?.(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  }

  return { error, loading, getAllPost };
};

import { useContext, useState } from "react";
import apiClient from "../services/api-client";
import { PostsContext } from "../context/PostsContext";

export class PostModel {
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

interface Response{
  posts:PostModel[];
  totalPages:number;
}

// Use a more specific type for the page parameter
export const useGetAllPosts = () => {
  const { setPosts, setTotalPages } = useContext(PostsContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Use async and await syntax
  async function getAllPost(page: number) {
    setLoading(true);
    try {
      // Use the API base URL and the template literal syntax
      const res = await apiClient.get<Response>(`/get-posts/?page=${page}`);
      // Use optional chaining and nullish coalescing operators
      setTotalPages(res.data.totalPages)
      setPosts?.(res.data.posts);
      setLoading(false);
    } catch (err:any) {
      // Use optional chaining and nullish coalescing operators
      setError(err.response?.data?.message ?? "Something went wrong");
      setLoading(false);
    }
  }

  return { error, loading, getAllPost };
};

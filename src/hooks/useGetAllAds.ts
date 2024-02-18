import { useState, useContext} from "react";
import apiClient from "../services/api-client";
import { PostsContext } from "../context/PostsContext";

export interface AdsResponse{
    _id: string;
    image: string;
    link: string;
    createdAt: string,
}

export const useGetAllAds = ()=>{
  const {setAds} = useContext(PostsContext)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function getAllAds() {
        setLoading(true);
        apiClient
          .get<AdsResponse[]>("/get-ads")
          .then((res) => {
            setAds(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.response.data.message);
            setLoading(false);
          });
      }

      return {error, loading, getAllAds}
}
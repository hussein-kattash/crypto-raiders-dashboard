import { useState, useContext} from "react";
import apiClient from "../services/api-client";
import { PostsContext } from "../context/PostsContext";

export interface PartnersResponse{
    _id: string;
    image: string;
    link: string;
    name:string;
    createdAt: string,
}

export const useGetAllPartners = ()=>{
  const {setPartners} = useContext(PostsContext)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function getAllPartners() {
        setLoading(true);
        apiClient
          .get<PartnersResponse[]>("/partners")
          .then((res) => {
            setPartners(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.response.data.message);
            setLoading(false);
          });
      }

      return {error, loading, getAllPartners}
}
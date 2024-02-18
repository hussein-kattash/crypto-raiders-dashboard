import { useState, useContext} from "react";
import apiClient from "../services/api-client";
import { PostsContext } from "../context/PostsContext";

class Links {
  telegram:string = "";
        twitter:string = "";
        linkedin:string = "";
        youtube:string = "";
        gmail:string = "";
}

export class MembersResponse{
    _id: string = "";
    image: string = "";
    name:string = "";
    role:string = "";
    links:Links = new Links();
}

export const useGetAllMembers = ()=>{
  const {setMembers} = useContext(PostsContext)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function getAllMembers() {
        setLoading(true);
        apiClient
          .get<MembersResponse[]>("/get-members")
          .then((res) => {
            setMembers(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.response.data.message);
            setLoading(false);
          });
      }

      return {error, loading, getAllMembers}
}
import { useContext, useState } from "react";
import apiClient from "../services/api-client";
import { PostsContext } from "../context/PostsContext";

export const useGetPostById = (id:string | undefined)=>{
    const {setPost} = useContext(PostsContext)
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    function getPostById(){
        setLoading(true);
        apiClient.get(`get-post/${id}`)
        .then((res)=>{
            setPost(res.data);
            setLoading(false);
        }).catch((err)=>{
            setError(err.response.data.message);
            setLoading(false);
        })
    }

    return{error, loading, getPostById}
}
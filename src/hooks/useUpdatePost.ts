import { useState } from "react";
import { PostInfo } from "./useAddPost";
import apiClient from "../services/api-client";


export const useUpdatePost = (id:string, postInfo:PostInfo)=>{
   
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function updatePost(){
        setLoading(true);
        try {
            const response = await apiClient.patch(`/update-post/${id}`, postInfo);
            return response;
        } catch (error:any) {
            setError(error.response.data.message);
        }finally {
            setLoading(false);
        }
    }

    return {error, loading, updatePost}
}
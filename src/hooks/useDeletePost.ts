import { useState } from "react";
import apiClient from "../services/api-client";

interface Response{
    data:{
        message:string
    },
    status:number;
}

interface UseDeletePost {
    loading: boolean;
    deletePost: () => Promise<number | undefined>;
}


export const useDeletePost = (postId:string):UseDeletePost=>{
    // const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const deletePost = async (): Promise<number | undefined> => {
        setLoading(true);
        try {
          const response = await apiClient.delete<Response>(`/delete-post/${postId}`);
          return response.status;
        } catch (error) {
             console.error(error)
        } finally {
          setLoading(false);
        }
      };

    return{loading, deletePost}
}
import { useState } from "react";
import apiClient from "../services/api-client";

export interface PostInfo{
    arTitle:string;
    enTitle:string;
    ruTitle:string;
    arContent:string;
    enContent:string;
    ruContent:string;
    arCategory:string[];
    enCategory:string[];
    ruCategory:string[];
    image:{
        name:string;
        type?:string
    };
}

interface Response{
    data:{
        message:string
    },
    status:number;
}

export const useAddProduct = (postInfo: PostInfo)=>{
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

   async function addNewPost(){
        setLoading(true);
        try {
            const response = await apiClient.post<Response>("/create-post", postInfo);
            return response.status;
        } catch (error:any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                setError(`API Error: ${error.response.data.message}`);
              } else if (error.request) {
                // The request was made but no response was received
                setError('Network Error');
              } else {
                // Something happened in setting up the request
                setError('An unexpected error occurred');
              }
        } finally{
            setLoading(false)
        }
    }

    return{error, loading , addNewPost}
}
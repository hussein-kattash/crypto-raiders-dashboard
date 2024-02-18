import { useState } from "react";
import apiClient from "../services/api-client";

interface AdsInfo{
    image:{
        name:string;
        type?:string
    }
}

export const useAddAds = (adsInfo:AdsInfo)=>{
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function addNewAds(){
        setLoading(true);
        try {
            const response = await apiClient.post("/create-ads", adsInfo);
            return response;
        } catch (error:any) {
            setError(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }
    return{error, loading, addNewAds}
}
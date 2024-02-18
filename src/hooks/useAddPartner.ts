import { useState } from "react";
import apiClient from "../services/api-client";

export interface PartnerInfo{
    image:{
        name:string;
        type?:string
    },
    name:string;
    link:string;
}

export const useAddPartner = (partnerInfo:PartnerInfo)=>{
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function addNewPartner(){
        setLoading(true);
        try {
            const response = await apiClient.post("/create/partner", partnerInfo);
            return response;
        } catch (error:any) {
            setError(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }
    return{error, loading, addNewPartner}
}
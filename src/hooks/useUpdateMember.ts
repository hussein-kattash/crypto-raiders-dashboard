import { useState } from "react";
import apiClient from "../services/api-client";
import { MemberInfo } from "./useAddMember";


export const useUpdateMember = (id:string = "", memberInfo:MemberInfo)=>{
   
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function updateMember(){
        setLoading(true);
        try {
            const response = await apiClient.patch(`/update-member/${id}`, memberInfo);
            return response;
        } catch (error:any) {
            setError(error.response.data.message);
        }finally {
            setLoading(false);
        }
    }

    return {error, loading, updateMember}
}
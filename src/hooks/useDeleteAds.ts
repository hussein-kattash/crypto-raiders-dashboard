import { useState } from "react";
import apiClient from "../services/api-client";

interface Response{
    data:{
        message:string
    },
    status:number;
}

interface UseDeleteAds {
    loading: boolean;
    deleteAds: () => Promise<number | undefined>;
}

export const UseDeleteAds = (adsId:string):UseDeleteAds=>{
    const [loading, setLoading] = useState<boolean>(false);

    const deleteAds = async (): Promise<number | undefined> => {
        setLoading(true);
        try {
          const response = await apiClient.delete<Response>(`/delete-ads/${adsId}`);
          return response.status;
        } catch (error) {
             console.error(error)
        } finally {
          setLoading(false);
        }
      };

      return {loading, deleteAds};
}
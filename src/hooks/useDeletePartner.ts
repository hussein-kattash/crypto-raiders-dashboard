import { useState } from "react";
import apiClient from "../services/api-client";

interface Response{
    data:{
        message:string
    },
    status:number;
}

interface UseDeletePartner {
    loading: boolean;
    deletePartner: () => Promise<number | undefined>;
}

export const UseDeletePartner = (partnerId:string):UseDeletePartner=>{
    const [loading, setLoading] = useState<boolean>(false);

    const deletePartner = async (): Promise<number | undefined> => {
        setLoading(true);
        try {
          const response = await apiClient.delete<Response>(`/delete/partner/${partnerId}`);
          return response.status;
        } catch (error) {
             console.error(error)
        } finally {
          setLoading(false);
        }
      };

      return {loading, deletePartner};
}
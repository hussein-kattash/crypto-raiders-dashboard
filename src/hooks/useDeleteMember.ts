import { useState } from "react";
import apiClient from "../services/api-client";

interface Response{
    data:{
        message:string
    },
    status:number;
}

interface UseDeleteMember {
    loading: boolean;
    deleteMember: () => Promise<number | undefined>;
}

export const UseDeleteMember = (memberId:string):UseDeleteMember=>{
    const [loading, setLoading] = useState<boolean>(false);

    const deleteMember = async (): Promise<number | undefined> => {
        setLoading(true);
        try {
          const response = await apiClient.delete<Response>(`/delete-member/${memberId}`);
          return response.status;
        } catch (error) {
             console.error(error)
        } finally {
          setLoading(false);
        }
      };

      return {loading, deleteMember};
}
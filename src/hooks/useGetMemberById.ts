import { useContext, useState } from "react";
import apiClient from "../services/api-client";
// import { MembersResponse } from "./useGetAllMembers";

import { PostsContext } from "../context/PostsContext";

export const useGetMemberById = (id:string | undefined)=>{
    const {setMember} = useContext(PostsContext)
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    function getMemberById(){
        setLoading(true);
        apiClient.get(`get-member/${id}`)
        .then((res)=>{
            setMember(res.data);
            setLoading(false);
        }).catch((err)=>{
            setError(err.response.data.message);
            setLoading(false);
        })
    }

    return{error, loading, getMemberById}
}
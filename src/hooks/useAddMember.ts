import { useState } from "react";
import apiClient from "../services/api-client";

export interface MemberInfo {
  name: string;
  role: string;
  image: {
    name: string;
    type: string;
  };
  links: {
    telegram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    gmail: string;
  };
}

export const useAddMember = (memberInfo: MemberInfo) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function addNewMember() {
    setLoading(true);
    try {
      const response = await apiClient.post("/create-member", memberInfo);
      return response;
    } catch (error:any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  return { error, loading, addNewMember };
};

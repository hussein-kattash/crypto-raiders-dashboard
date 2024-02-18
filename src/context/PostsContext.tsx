import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { PostResponse } from '../hooks/useGetAllPosts';
import { AdsResponse } from '../hooks/useGetAllAds';
import { MembersResponse } from '../hooks/useGetAllMembers';
import { PartnersResponse } from '../hooks/useGetAllPartners';

export interface PostsContextProps {
  posts: PostResponse[];
  post:PostResponse;
  ads: AdsResponse[];
  members:MembersResponse[];
  partners:PartnersResponse[];
  member:MembersResponse;
  setAds: Dispatch<SetStateAction<AdsResponse[]>>;
  setPosts: Dispatch<SetStateAction<PostResponse[]>>;
  setMembers: Dispatch<SetStateAction<MembersResponse[]>>;
  setPartners: Dispatch<SetStateAction<PartnersResponse[]>>;
  setMember: Dispatch<SetStateAction<MembersResponse>>;
  setPost: Dispatch<SetStateAction<PostResponse>>;
}

export const PostsContext = createContext<PostsContextProps>({
  posts: [],
  post:{} as PostResponse,
  ads: [],
  members: [],
  partners:[],
  member:{} as MembersResponse,
  setAds: () => {},
  setPosts: () => {},
  setMembers: () => {},
  setMember: () => {},
  setPost: () => {},
  setPartners:()=>{}
});

interface Props {
  children: ReactNode;
}

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [ads, setAds] = useState<AdsResponse[]>([]);
  const [members, setMembers] = useState<MembersResponse[]>([]);
  const [member, setMember] = useState<MembersResponse>(new MembersResponse());
  const [post, setPost] = useState<PostResponse>(new PostResponse());
  const [partners, setPartners] = useState<PartnersResponse[]>([]);

  return (
    <PostsContext.Provider value={{post, setPost,member, partners, setPartners, setMember ,posts, setPosts, setAds, ads, members, setMembers }}>
      {children}
    </PostsContext.Provider>
  );
};



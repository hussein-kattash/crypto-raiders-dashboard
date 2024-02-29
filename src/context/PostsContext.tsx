import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { PostModel } from "../hooks/useGetAllPosts";
import { AdsResponse } from "../hooks/useGetAllAds";
import { MembersResponse } from "../hooks/useGetAllMembers";
import { PartnersResponse } from "../hooks/useGetAllPartners";

export interface PostsContextProps {
  totalPages: number;
  posts: PostModel[];
  post: PostModel;
  ads: AdsResponse[];
  members: MembersResponse[];
  partners: PartnersResponse[];
  member: MembersResponse;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setAds: Dispatch<SetStateAction<AdsResponse[]>>;
  setPosts: Dispatch<SetStateAction<PostModel[]>>;
  setMembers: Dispatch<SetStateAction<MembersResponse[]>>;
  setPartners: Dispatch<SetStateAction<PartnersResponse[]>>;
  setMember: Dispatch<SetStateAction<MembersResponse>>;
  setPost: Dispatch<SetStateAction<PostModel>>;
}

export const PostsContext = createContext<PostsContextProps>({
  totalPages: 0,
  posts: [],
  post: {} as PostModel,
  ads: [],
  members: [],
  partners: [],
  member: {} as MembersResponse,
  setAds: () => {},
  setPosts: () => {},
  setMembers: () => {},
  setMember: () => {},
  setPost: () => {},
  setPartners: () => {},
  setTotalPages: () => {},
});

interface Props {
  children: ReactNode;
}

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [ads, setAds] = useState<AdsResponse[]>([]);
  const [members, setMembers] = useState<MembersResponse[]>([]);
  const [member, setMember] = useState<MembersResponse>(new MembersResponse());
  const [post, setPost] = useState<PostModel>(new PostModel());
  const [partners, setPartners] = useState<PartnersResponse[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <PostsContext.Provider
      value={{
        totalPages,
        setTotalPages,
        post,
        setPost,
        member,
        partners,
        setPartners,
        setMember,
        posts,
        setPosts,
        setAds,
        ads,
        members,
        setMembers,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

import Navbar from "../../components/Navbar";
import CardMember from "../../components/CardMember";
import { Box } from "@mui/material";
import { PostsContext } from "../../context/PostsContext";
import { useContext, useEffect } from "react";
import { useGetAllMembers } from "../../hooks/useGetAllMembers";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Team = () => {
  const { members } = useContext(PostsContext);
  const { getAllMembers } = useGetAllMembers();

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div>
      <Navbar />
      <Box sx={{ m: "30px" }}>
        <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 12, md: 12, lg: 12 }}
        className="cards"
        >
          {members.map((member) => (
            <Grid2 xs={3} sm={6} md={4} lg={3} key={member._id}>
              <CardMember
                id={member._id}
                image={member.image}
                name={member.name}
                role={member.role}
                telegram={member.links.telegram}
                twitter={member.links.twitter}
                linkedin={member.links.linkedin}
                gmail={member.links.gmail}
                youtube={member.links.youtube}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </div>
  );
};

export default Team;

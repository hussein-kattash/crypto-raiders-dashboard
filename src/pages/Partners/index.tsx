import Partner from "../../components/Partner";
import Navbar from "../../components/Navbar";
import { useGetAllPartners } from "../../hooks/useGetAllPartners";
import { useContext, useEffect } from "react";
import { PostsContext } from "../../context/PostsContext";
import { Alert, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";

const Partners = () => {
  const { error, loading, getAllPartners } = useGetAllPartners();
  const {partners} = useContext(PostsContext);

  useEffect(()=>{
    getAllPartners();
  },[])
  
  return (
    <div>
      <Navbar/>
      {error && (
        <Alert sx={{ mt: "10px" }} severity="error">
          {error}
        </Alert>
      )}
      {loading && (
        <Box
          sx={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 12, md: 12, lg: 12 }}
        className="cards"
        sx={{ padding: "30px", placeItems: "center" }}
      >
        {partners.length > 0 ? partners.map((partner) => (
          <Grid2 xs={3} sm={12} md={6} lg={6} key={partner._id}>
            <Partner name={partner.name} image={partner.image} id={partner._id} link={partner.link}/>
          </Grid2>
        )):(
          <Box
            sx={{
              m: "30px auto",
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Alert
              sx={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
                width: "100%",
              }}
              severity="info"
            >
              لا يوجد شراكات في الوقت الحالي <Link to="/add-partner">اضغط هنا</Link>{" "}
              لإضافة شراكة جديد
            </Alert>
          </Box>
        )
      }
      </Grid2>
    </div>
  )
}

export default Partners
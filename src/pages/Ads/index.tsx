import Navbar from "../../components/Navbar/index";
import Adss from "../../components/Ads/index";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useGetAllAds } from "../../hooks/useGetAllAds";
import { useContext, useEffect } from "react";
import { PostsContext } from "../../context/PostsContext";
import { Alert, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const Ads = () => {
  const { error, loading, getAllAds } = useGetAllAds();
  const {ads} = useContext(PostsContext)

  useEffect(() => {
    getAllAds();
  },[]);

  return (
    <div>
      <Navbar />
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
        {ads.length > 0 && ads.map((ad) => (
          <Grid2 xs={3} sm={12} md={6} lg={6} key={ad._id}>
            <Adss image={ad.image} id={ad._id} link={ad.link}/>
          </Grid2>
        )) 
       }
       {
        (ads.length === 0 && !loading) && (
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
            لا يوجد إعلانات في الوقت الحالي <Link to="/add-ads">اضغط هنا</Link>{" "}
            لإضافة إعلان جديد
          </Alert>
        </Box>
        )
       }
      </Grid2>
    </div>
  );
};

export default Ads;

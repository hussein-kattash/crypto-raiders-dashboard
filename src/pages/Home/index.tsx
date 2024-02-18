import { Box, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import image from "../../assets/hand-drawn-crypto-concept_23-2149163546.jpg"

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Box m={'40px'}>
        <Typography sx={{fontFamily:'Tajawal'}} variant="h4">اهلا وسهلا بكم في لوحة معلومات CryptoRaiders</Typography>
        <Box sx={{mt:"40px",display:"flex", justifyContent:"center"}}>
          <img src={image} width={'50%'}/>
        </Box>
      </Box>
    </div>
  )
}

export default Home
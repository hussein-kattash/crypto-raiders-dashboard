import { Box } from "@mui/material";
import EditMemberInfo from "../../components/EditMemberInfo";
import Navbar from "../../components/Navbar/index"

const EditMember = () => {
  return (
    <div>
       <Navbar/>
       <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
         <EditMemberInfo/>
       </Box>
    </div>
  )
}

export default EditMember
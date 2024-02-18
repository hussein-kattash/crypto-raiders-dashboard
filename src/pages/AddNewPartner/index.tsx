import AddPartner from "../../components/AddPartner";
import Navbar from "../../components/Navbar";

const AddNewPartner = () => {
  return (
    <div  style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Navbar/>
        <AddPartner/>
    </div>
  )
}

export default AddNewPartner;
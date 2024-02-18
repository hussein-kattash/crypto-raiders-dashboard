import Navbar from "../../components/Navbar";
import AddNewAds from '../../components/AddNewAds';

const AddAds = () => {
  return (
    <div
    style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <Navbar/>
        <AddNewAds/>
    </div>
  )
}

export default AddAds
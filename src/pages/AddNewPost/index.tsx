import Navbar from "../../components/Navbar";
import AddNewProduct from "../../components/AddNewProduct";

const AddNewPost = () => {

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
      <AddNewProduct/>
    </div>
  );
};

export default AddNewPost;

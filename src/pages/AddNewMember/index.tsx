import Navbar from '../../components/Navbar';
import AddMember from '../../components/AddMember';

const AddNewMember = () => {
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
        <AddMember/>
    </div>
  )
}

export default AddNewMember;
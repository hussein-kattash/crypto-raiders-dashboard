import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Tooltip
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import InputText from "../InputText";
import { useAddMember } from "../../hooks/useAddMember";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MemberInfo {
  name: string;
  role: string;
  image: {
    name: string;
    type: string;
  };
  links:{
    telegram:string,
    twitter:string,
    linkedin:string,
    youtube:string,
    gmail:string
  };
}

const AddMember = () => {
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const initialMemberState: MemberInfo = {
    name: "",
    role: "",
    image: {
      name: "",
      type: "",
    },
    links: {
      telegram:"",
      twitter:"",
      linkedin:"",
      youtube:"",
      gmail:""
    },
  };
  const [memberInfo, setMemberInfo] = useState<MemberInfo>(initialMemberState);
  const {error, loading, addNewMember} = useAddMember(memberInfo)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      setMemberInfo((member) => ({
        ...member,
        image: { ...member.image, type: selectedFile!.type },
      }));

      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setFile(event.target.result);
          const base64 = event.target.result.split(",")[1];
          setMemberInfo((prevMem) => ({
            ...prevMem,
            image: { ...prevMem.image, name: base64 },
          }));
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const cancelImage = () => {
    setFile("");
    setMemberInfo((member) => ({
      ...member,
      image: { ...member.image, type: "" },
    }));

    setMemberInfo((prevMem) => ({
      ...prevMem,
      image: { ...prevMem.image, name: "" },
    }));
  };

  const notify = () =>
    toast.success("!تم إنشاء عضو جديد بنجاح", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleSubmit = async() => {
    if (!memberInfo.name || !memberInfo.role) {
      setValidate(true);
    } else {
      const response = await addNewMember();
      if(response?.status === 201){
        setMemberInfo(initialMemberState);
        setFile("");
        notify();
      }
    }
  };

  return (
    <Card
      sx={{
        padding: "20px",
        marginBottom: "50px",
        marginTop: "50px",
        width: "800px",
        minHeight: "420px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <Box
        display={"flex"}
        position={"relative"}
        width={"100%"}
        justifyContent={"center"}
      >
        <Tooltip title="العودة إلى صفحة الإعلانات" arrow>
          <Button
            onClick={() => navigate("/team")}
            variant="contained"
            sx={{ textAlign: "left", position: "absolute", right: "0px" }}
          >
            <ArrowBackIcon />
          </Button>
        </Tooltip>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: "capitalize", direction: "ltr" }}
        >
          تحميل صورة
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </Button>
        {file && (
          <Button
            onClick={cancelImage}
            component="label"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
              textTransform: "capitalize",
              position: "absolute",
              left: "0px",
            }}
          >
            إلغاء الصورة
          </Button>
        )}
      </Box>
      {file && (
        <img
          src={file}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            marginTop: "20px",
          }}
        />
      )}
      <Box sx={{ width: "100%", marginTop: "20px", display:'flex', flexDirection:"column", gap:'20px'}}>
        <InputText
          dir="rtl"
          validate={validate}
          value={memberInfo.name}
          label="الاسم"
          handleChange={(e) =>
            setMemberInfo({ ...memberInfo, name: e.target.value })
          }
        />
        <InputText
          dir="rtl"
          validate={validate}
          value={memberInfo.role}
          label="الدور"
          handleChange={(e) =>
            setMemberInfo({ ...memberInfo, role: e.target.value })
          }
        />
        <InputText
          dir="rtl"
          value={memberInfo.links.twitter}
          label="رابط ال twitter(X) (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, twitter:e.target.value },
            }))
          }
        />
        <InputText
          dir="rtl"
          value={memberInfo.links.telegram}
          label="رابط ال telegram (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, telegram:e.target.value },
            }))
          }
        />
        <InputText
          dir="rtl"
          value={memberInfo.links.youtube}
          label="رابط ال youtube (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, youtube:e.target.value },
            }))
          }
        />
        <InputText
          dir="rtl"
          value={memberInfo.links.linkedin}
          label="رابط ال Linkedin (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, linkedin:e.target.value },
            }))
          }
        />
         <InputText
          dir="rtl"
          value={memberInfo.links.gmail}
          label="حساب ال Gmail (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, gmail:e.target.value },
            }))
          }
        />
      </Box>
      <Box sx={{ m: 1, position: "relative", width: "100%" }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            width: "100%",
            marginTop: "20px",
            textTransform: "capitalize",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={loading}
        >
          إضافة عضو جديد
          {loading && <CircularProgress size={24} />} 
        </Button>
        <ToastContainer/>
      </Box>
      {error && (
          <Alert sx={{ mt: "10px" }} severity="error">
            {error}
          </Alert>
        )}
    </Card>
  );
};

export default AddMember;

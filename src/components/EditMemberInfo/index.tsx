import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import InputText from "../InputText";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMemberById } from "../../hooks/useGetMemberById";
import { PostsContext } from "../../context/PostsContext";
import { useUpdateMember } from "../../hooks/useUpdateMember";

interface MemberInfo {
  name: string;
  role: string;
  image: {
    name: string;
    type: string;
  };
  links: {
    telegram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    gmail: string;
  };
}

const EditMemberInfo = () => {
  const { member, setMember} = useContext(PostsContext);
  const [file, setFile] = useState(member.image);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const { id } = useParams();
  const { getMemberById } = useGetMemberById(id);

  useEffect(() => {
    getMemberById();
  }, []);

  const initialMemberState: MemberInfo = {
    name: member.name,
    role: member.role,
    image: {
      name: member.image.split(",")[1],
      type: `image/${member?.image.substring(
        member.image.indexOf("/") + 1,
        member.image.indexOf(";")
      )}`,
    },
    links: {
      telegram: member.links.telegram,
      twitter: member.links.twitter,
      linkedin: member.links.linkedin,
      youtube: member.links.youtube,
      gmail: member.links.gmail,
    },
  };

  const [memberInfo, setMemberInfo] = useState({...initialMemberState});
  const { error, loading, updateMember } = useUpdateMember(id, memberInfo);

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
    toast.success("!تم تعديل بيانات العضو بنجاح", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleSubmit = async () => {
    if (!memberInfo.name || !memberInfo.role) {
      setValidate(true);
    } else {
      const response = await updateMember();
      if (response?.status === 200) {
        setMember(response.data.member)
        setMemberInfo(response.data.member);
        setEdit(false);
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
        {edit && (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ textTransform: "capitalize", direction: "ltr" }}
          >
            تحميل صورة جديدة
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Button>
        )}
        {edit && (
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
      {member.image && (
        <img
          src={(file && edit) ? file : member.image}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            marginTop: "20px",
          }}
        />
      )}
      <Box
        sx={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap:"20px"
        }}
      >
        <InputText
          dir="ltr"
          validate={validate}
          value={edit ? memberInfo.name : member.name}
          label="الاسم"
          handleChange={(e) =>
            setMemberInfo({ ...memberInfo, name: e.target.value })
          }
        />
        <InputText
          dir="ltr"
          validate={validate}
          value={edit ? memberInfo.role : member.role}
          label="الدور"
          handleChange={(e) =>
            setMemberInfo({ ...memberInfo, role: e.target.value })
          }
        />
        <InputText
          dir="ltr"
          value={edit ? memberInfo.links.twitter : member.links.twitter}
          label="رابط ال twitter(X) (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, twitter: e.target.value },
            }))
          }
        />
        <InputText
          dir="ltr"
          value={edit ? memberInfo.links.telegram : member.links.telegram}
          label="رابط ال telegram (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, telegram: e.target.value },
            }))
          }
        />
        <InputText
          dir="ltr"
          value={edit ? memberInfo.links.youtube : member.links.youtube}
          label="رابط ال youtube (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, youtube: e.target.value },
            }))
          }
        />
        <InputText
          dir="ltr"
          value={edit ? memberInfo.links.linkedin : member.links.linkedin}
          label="رابط ال Linkedin (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, linkedin: e.target.value },
            }))
          }
        />
        <InputText
          dir="ltr"
          value={edit ? memberInfo.links.gmail : member.links.gmail}
          label="حساب ال Gmail (اختياري)"
          handleChange={(e) =>
            setMemberInfo((member) => ({
              ...member,
              links: { ...member.links, gmail: e.target.value },
            }))
          }
        />
      </Box>
      {edit ? (
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", mt:"20px"}}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled={loading}
          >
            تعديل بيانات العضو
            {loading && <CircularProgress size={24} />}
          </Button>
          <Button
            onClick={() => setEdit(false)}
            variant="outlined"
            sx={{ ml: "20px" }}
          >
            إلغاء
          </Button>
          <ToastContainer />
        </Box>
      ) : (
        <Box width={"100%"} mt={'20px'}>
          <Tooltip title="تعديل بيانات هذا العضو" arrow>
            <Button
              onClick={() => {setEdit(true), setMemberInfo({...initialMemberState})}}
              sx={{ marginLeft: "5px" }}
              variant="contained"
            >
              <EditIcon />
            </Button>
          </Tooltip>
        </Box>
      )}
      {error && (
        <Alert sx={{ mt: "10px" }} severity="error">
          {error}
        </Alert>
      )}
    </Card>
  );
};

export default EditMemberInfo;

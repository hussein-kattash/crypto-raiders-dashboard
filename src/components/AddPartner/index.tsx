import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { PartnerInfo, useAddPartner } from "../../hooks/useAddPartner";
import InputText from "../InputText";
import { ToastContainer, toast } from "react-toastify";

const AddPartner = () => {
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);

  const initialPartnerState = {
    name: "",
    link: "",
    image: {
      name: "",
      type: "",
    },
  };

  const [partner, setPartner] = useState<PartnerInfo>(initialPartnerState);
  const { error, loading, addNewPartner } = useAddPartner(partner);

  const cancelImage = () => {
    setFile("");
    setPartner((prevPartner) => ({
      ...prevPartner,
      image: { ...prevPartner.image, type: "" },
    }));

    setPartner((prevPartner) => ({
      ...prevPartner,
      image: { ...prevPartner.image, name: "" },
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setPartner((prevPartner) => ({
      ...prevPartner,
      image: { ...prevPartner.image, type: selectedFile?.type },
    }));
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setFile(event.target.result);
          const base64 = event.target.result.split(",")[1];
          setPartner((prevPartner) => ({
            ...prevPartner,
            image: { ...prevPartner.image, name: base64 },
          }));
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const notify = () =>
    toast.success("!تم إنشاء الشراكة بنجاح", {
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
    if (!(partner.name && partner.link)) {
      setValidate(true);
    } else {
      const data = await addNewPartner();
      if (data?.status === 201) {
        setPartner(initialPartnerState);
        setFile("");
        notify();
        setValidate(false);
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
        minHeight: "320px",
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
        <Tooltip title="العودة إلى صفحة الشراكات" arrow>
          <Button
            onClick={() => navigate("/partners")}
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
            ألغاء الصورة
          </Button>
        )}
      </Box>
      {file && <img src={file} style={{ width: "100%", marginTop: "20px" }} />}
      <Box
        sx={{
          width: "100%",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <InputText
          dir="ltr"
          label="اسم الشراكة"
          validate={validate}
          value={partner.name}
          handleChange={(e) => setPartner({ ...partner, name: e.target.value })}
        />
        <InputText
          dir="ltr"
          label="رابط الشراكة"
          validate={validate}
          value={partner.link}
          handleChange={(e) => setPartner({ ...partner, link: e.target.value })}
        />
        <Box sx={{ m: 1, position: "relative" }}>
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
            إضافة شراكة جديدة
            {loading && <CircularProgress size={24} />}
          </Button>
          <ToastContainer />
          {error && (
            <Alert sx={{ mt: "10px" }} severity="error">
              {error}
            </Alert>
          )}
          {validate && (
            <Alert sx={{ mt: "10px" }} severity="error">
              كل الحقول مطلوبة
            </Alert>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default AddPartner;

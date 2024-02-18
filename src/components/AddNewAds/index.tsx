import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { useAddAds } from "../../hooks/useAddAds";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewAds = () => {
  const [file, setFile] = useState("");
  const [validate, setValidate] = useState(false);
  const initialAdsState = {
    image: {
      name: "",
      type: "",
    },
    link: "",
  };

  const notify = () =>
    toast.success("!تم إنشاء الإعلان بنجاح", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [ads, setAds] = useState(initialAdsState);
  const { error, loading, addNewAds } = useAddAds(ads);

  const navigate = useNavigate();

  const cancelImage = () => {
    setFile("");
    setAds((prevAds) => ({
      ...prevAds,
      image: { ...prevAds.image, type: "" },
    }));

    setAds((prevAds) => ({
      ...prevAds,
      image: { ...prevAds.image, name: "" },
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setAds((prevAds) => ({
      ...prevAds,
      image: { ...prevAds.image, type: selectedFile!.type },
    }));

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setFile(event.target.result);
          const base64 = event.target.result.split(",")[1];
          setAds((prevAds) => ({
            ...prevAds,
            image: { ...prevAds.image, name: base64 },
          }));
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!ads.link) {
      setValidate(true);
    } else {
      const res = await addNewAds();
      if (res?.status === 201) {
        setAds(initialAdsState);
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
      <ToastContainer />
      <Box
        display={"flex"}
        position={"relative"}
        width={"100%"}
        justifyContent={"center"}
      >
        <Tooltip title="العودة إلى صفحة الإعلانات" arrow>
          <Button
            onClick={() => navigate("/ads")}
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
            ألغاء الإعلان
          </Button>
        )}
      </Box>
      {file && <img src={file} style={{ width: "100%", marginTop: "20px" }} />}
      <FormControl error={!ads.link && validate} sx={{ marginTop: "40px", width:"100%" }}>
        <InputLabel htmlFor="link">رابط الإعلان</InputLabel>
        <OutlinedInput
          value={ads.link}
          onChange={(e) => setAds({ ...ads, link: e.target.value })}
          id="link"
          label="رابط الإعلان"
          placeholder="ادخل هنا رابط الإعلان"
        />
      </FormControl>
      {file && (
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
            إضافة إعلان جديد
            {/* {loading && <CircularProgress size={24} />} */}
          </Button>
        </Box>
      )}
      <Box>
        {error && (
          <Alert sx={{ mt: "10px" }} severity="error">
            {error}
          </Alert>
        )}
      </Box>
    </Card>
  );
};

export default AddNewAds;

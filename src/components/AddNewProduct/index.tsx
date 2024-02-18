import { useState, ChangeEvent, useRef } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Card,
  Alert,
  CircularProgress,
  Tooltip,
  SelectChangeEvent,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { PostInfo } from "../../hooks/useAddPost";
import { useAddProduct } from "../../hooks/useAddPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../MultiSelect";
import InputText from "../InputText";

const categoriesAr = [
  "شروحات",
  "مقالات",
  "أخبار",
  "التقنية",
  "المنصات",
  "العملات المشفرة",
  "التعدين",
  "تحليل فني",
  "منوعات اقتصادية",
];

const categoriesEn = [
  "Tutorials",
  "Articles",
  "News",
  "Technical",
  "Platforms",
  "Cryptocurrencies",
  "Mining",
  "Technical Analysis",
  "Economic Miscellaneous",
];
const categoriesRu = [
  "Инструкции",
  "Статьи",
  "Новости",
  "Технический",
  "Платформы",
  "Криптовалюты",
  "Майнинг",
  "Технический анализ",
  "Экономическое разное",
];

const AddNewProduct = () => {
  const [file, setFile] = useState("");
  const [validate, setValidate] = useState(false);
  const initialPostState = {
    arTitle: "",
    enTitle: "",
    ruTitle: "",
    arContent: "",
    enContent: "",
    ruContent: "",
    arCategory: [],
    enCategory: [],
    ruCategory: [],
    image: {
      name: "",
      type: "",
    },
  };
  const [post, setPost] = useState<PostInfo>(initialPostState);
  const { error, loading, addNewPost } = useAddProduct(post);
  const editor = useRef(null);
  const navigate = useNavigate();

  const notify = () =>
    toast.success("!تم إنشاء المنشور بنجاح", {
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
    if (!post.arTitle || !post.enTitle || !post.ruTitle) {
      setValidate(true);
    } else if (!post.arContent || !post.enContent || !post.ruContent) {
      setValidate(true);
    } else if (
      post.arCategory.length === 0 ||
      post.enCategory.length === 0 ||
      post.ruCategory.length === 0
    ) {
      setValidate(true);
    } else {
      const status = await addNewPost();
      if (status === 201) {
        setPost(initialPostState);
        setFile("");
        notify();
        setValidate(false);
      }
    }
  };

  const cancelImage = () => {
    setFile("");
    setPost((prevPost) => ({
      ...prevPost,
      image: { ...prevPost.image, type: "" },
    }));

    setPost((prevPost) => ({
      ...prevPost,
      image: { ...prevPost.image, name: "" },
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setPost((prevPost) => ({
      ...prevPost,
      image: { ...prevPost.image, type: selectedFile?.type },
    }));

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setFile(event.target.result);
          const base64 = event.target.result.split(",")[1];
          setPost((prevPost) => ({
            ...prevPost,
            image: { ...prevPost.image, name: base64 },
          }));
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChangeAr = (event: SelectChangeEvent<typeof post.arCategory>) => {
    const {
      target: { value },
    } = event;
    setPost({
      ...post,
      arCategory: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeEn = (event: SelectChangeEvent<typeof post.enCategory>) => {
    const {
      target: { value },
    } = event;
    setPost({
      ...post,
      enCategory: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeRu = (event: SelectChangeEvent<typeof post.ruCategory>) => {
    const {
      target: { value },
    } = event;
    setPost({
      ...post,
      ruCategory: typeof value === "string" ? value.split(",") : value,
    });
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
        <Tooltip title="العودة إلى صفحة المقالات" arrow>
          <Button
            onClick={() => navigate("/posts")}
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
          gap:"20px"
        }}
      >
        {/* select category */}
        <MultiSelect
          validate={validate}
          label="نوع المقالة"
          categories={categoriesAr}
          category={post.arCategory}
          handleChange={handleChangeAr}
        />
        <MultiSelect
          validate={validate}
          label="Article Type"
          categories={categoriesEn}
          category={post.enCategory}
          handleChange={handleChangeEn}
        />
        <MultiSelect
          validate={validate}
          label="Тип статьи"
          categories={categoriesRu}
          category={post.ruCategory}
          handleChange={handleChangeRu}
        />

        {/* enter article type */}
        <InputText
          dir="ltr"
          label="عنوان المقالة"
          validate={validate}
          value={post.arTitle}
          handleChange={(e) => setPost({ ...post, arTitle: e.target.value })}
        />
        <InputText
          dir="rtl"
          label="Article title"
          validate={validate}
          value={post.enTitle}
          handleChange={(e) => setPost({ ...post, enTitle: e.target.value })}
        />
        <InputText
          dir="rtl"
          label="Заголовок статьи"
          validate={validate}
          value={post.ruTitle}
          handleChange={(e) => setPost({ ...post, ruTitle: e.target.value })}
        />

        {/* enter article content */}
        <div>
        <label style={{fontSize:"20px"}}>محتوى المقالة:</label>
          <JoditEditor
            ref={editor}
            value={post.arContent}
            onChange={(newContent) => setPost({ ...post, arContent: newContent })}
            />
        </div>
        <div dir="ltr">
         <label style={{fontSize:"20px"}}>Post Content:</label>
          <JoditEditor
            ref={editor}
            value={post.enContent}
            onChange={(newContent) => setPost({ ...post, enContent: newContent })}
          />
        </div>
        <div dir="ltr">
          <label style={{fontSize:"20px"}}>Контент поста:</label>
          <JoditEditor
            ref={editor}
            value={post.ruContent}
            onChange={(newContent) => setPost({ ...post, ruContent: newContent })}
          />
        </div>
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
            إضافة مقال جديد
            {loading && <CircularProgress size={24} />}
          </Button>
        </Box>
        <ToastContainer style={{ direction: "rtl" }} />
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
    </Card>
  );
};

export default AddNewProduct;

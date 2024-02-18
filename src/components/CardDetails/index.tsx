import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { PostInfo } from "../../hooks/useAddPost";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import { ToastContainer, toast } from "react-toastify";
import { PostsContext } from "../../context/PostsContext";
import DeletePost from "../DeleteDialog";
import MultiSelect from "../MultiSelect";
import JoditEditor from "jodit-react";
import InputText from "../InputText";

interface Props {
  error: string;
  loading: boolean;
}
 

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

const CardDetails = ({ loading, error }: Props) => {
  const { post } = useContext(PostsContext);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const cancelEdit = () => {
    setEdit(false);
  };

  return (
    <Card
      sx={{
        width: "800px",
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {!edit && (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading && <CircularProgress />}
          </Box>
          <Box width={"100%"}>
            {error && (
              <Alert sx={{ mt: "10px" }} severity="error">
                Error: {error}
              </Alert>
            )}
          </Box>
          <Box>
            <img src={post?.image} width={"100%"} />
          </Box>
          <Box gap={1} display={"flex"} flexWrap={"wrap"} mt={"20px"}>
            {post.category.ar.map((category) => (
              <Chip
                label={category}
                key={category}
                color="primary"
                sx={{ height: "25px" }}
              />
            ))}
          </Box>
          <Box>
            <Typography mt={"20px"} variant="h4">
              {post?.title.ar}
            </Typography>
            <Typography mt={"20px"} dangerouslySetInnerHTML={{ __html: post.content.ar }}/> 
            <Box
              mt={"20px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Tooltip title="تعديل هذه المقالة" arrow>
                <Button onClick={() => setEdit(true)} variant="contained">
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip title="العودة الى صفحة المقالات" arrow>
                <Button onClick={() => navigate("/posts")} variant="contained">
                  <ArrowBackIcon />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      )}
      {edit && (
        <Box>
          <EditPost
            categoryAr={post?.category.ar}
            categoryEn={post?.category.en}
            categoryRu={post?.category.ru}
            cancelEdit={cancelEdit}
            id={post?._id}
            titleAr={post?.title.ar}
            titleEn={post?.title.en}
            titleRu={post?.title.ru}
            contentAr={post?.content.ar}
            contentEn={post?.content.en}
            contentRu={post?.content.ru}
            image={post?.image}
          />
        </Box>
      )}
    </Card>
  );
};

export default CardDetails;

interface EditProps {
  id: string;
  image?: string;
  titleAr?: string;
  titleEn?: string;
  titleRu?: string;
  contentAr?: string;
  contentEn?: string;
  contentRu?: string;
  categoryAr?: string[];
  categoryEn?: string[];
  categoryRu?: string[];
  cancelEdit: () => void;
}

const EditPost = ({
  cancelEdit,
  id,
  image = "",
  titleAr = "",
  titleEn = "",
  titleRu = "",
  contentAr = "",
  contentEn = "",
  contentRu = "",
  categoryEn = [],
  categoryAr = [],
  categoryRu = [],
}: EditProps) => {
  const { setPost } = useContext(PostsContext);
  const initialPostState = {
    arTitle: titleAr,
    enTitle: titleEn,
    ruTitle: titleRu,
    arContent: contentAr,
    enContent: contentEn,
    ruContent: contentRu,
    arCategory: categoryAr,
    enCategory: categoryEn,
    ruCategory: categoryRu,
    image: {
      name: image.split(",")[1],
      type: `image/${image.substring(
        image.indexOf("/") + 1,
        image.indexOf(";")
      )}`,
    },
  };

  const editor = useRef(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(image);
  const [postInfo, setPostInfo] = useState<PostInfo>(initialPostState);
  const [validate, setValidate] = useState(false);
  const { loading, updatePost } = useUpdatePost(id, postInfo);
  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    setPostInfo((prevPost) => ({
      ...prevPost,
      image: { ...prevPost.image, type: selectedFile?.type },
    }));

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setFile(event.target.result);
          const base64 = event.target.result.split(",")[1];
          setPostInfo((prevPost) => ({
            ...prevPost,
            image: { ...prevPost.image, name: base64 },
          }));
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const notify = () =>
    toast.success("تم تعديل المنشور بنجاح", {
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
    if (!postInfo.arContent || !postInfo.arTitle) {
      setValidate(true);
    } else {
      const status = await updatePost();
      if (status?.status === 200) {
        notify();
        setPost(status.data.post);
        handleClose();
        setTimeout(() => {
          cancelEdit();
        }, 3000);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setPostInfo((prevPost) => ({
      ...prevPost,
      image: { ...prevPost.image, type: "" },
    }));
    setPostInfo((prevPost) => ({
      ...prevPost,
      name: { ...prevPost.image, name: "" },
    }));
    setOpen(true);
  };

  const handleChangeAr = (
    event: SelectChangeEvent<typeof postInfo.arCategory>
  ) => {
    const {
      target: { value },
    } = event;
    setPostInfo({
      ...postInfo,
      arCategory: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeEn = (
    event: SelectChangeEvent<typeof postInfo.enCategory>
  ) => {
    const {
      target: { value },
    } = event;
    setPostInfo({
      ...postInfo,
      enCategory: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleChangeRu = (
    event: SelectChangeEvent<typeof postInfo.ruCategory>
  ) => {
    const {
      target: { value },
    } = event;
    setPostInfo({
      ...postInfo,
      ruCategory: typeof value === "string" ? value.split(",") : value,
    });
  };

  const renderTooltipAndButton = () => (
    <Tooltip title="العودة الى صفحة المقالات" arrow>
      <Button
        onClick={() => navigate("/posts")}
        variant="contained"
        sx={{ textAlign: "left", position: "absolute", right: "0px" }}
      >
        <ArrowBackIcon />
      </Button>
    </Tooltip>
  );

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <ToastContainer />
      <Box
        display="flex"
        position="relative"
        width="100%"
        justifyContent="center"
      >
        {renderTooltipAndButton()}
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: "capitalize" }}
        >
          تحميل صورة
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </Button>
        {image && (
          <Button
            onClick={handleOpen}
            component="label"
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
              textTransform: "capitalize",
              position: "absolute",
              left: "0px",
            }}
          >
            حذف الصورة
          </Button>
        )}
        <DeletePost
          confirmDelete={handleSubmit}
          open={open}
          handleClose={handleClose}
          loading={loading}
        />
      </Box>
      {file && <img src={file} style={{ width: "100%", marginTop: "20px" }} />}
      <Box
        sx={{
          width: "100%",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          gap:'20px'
        }}
      >
        <MultiSelect
          label="نوع المقالة"
          validate={validate}
          categories={categoriesAr}
          category={postInfo.arCategory}
          handleChange={handleChangeAr}
        />
          <MultiSelect
          label="Article Type"
          validate={validate}
          categories={categoriesEn}
          category={postInfo.enCategory}
          handleChange={handleChangeEn}
        />
          <MultiSelect
          label="Тип статьи"
          validate={validate}
          categories={categoriesRu}
          category={postInfo.ruCategory}
          handleChange={handleChangeRu}
        />
        <InputText
          dir="ltr"
          label="عنوان المقالة"
          validate={validate}
          value={postInfo.arTitle}
          handleChange={(e) =>
            setPostInfo({ ...postInfo, arTitle: e.target.value })}
        />
         <InputText
          dir="rtl"
          label="Post Title"
          validate={validate}
          value={postInfo.enTitle}
          handleChange={(e) =>
            setPostInfo({ ...postInfo, enTitle: e.target.value })}
        />
         <InputText
          dir="rtl"
          label="Заголовок статьи"
          validate={validate}
          value={postInfo.ruTitle}
          handleChange={(e) =>
            setPostInfo({ ...postInfo, ruTitle: e.target.value })}
        />
        <div> 
        <label style={{fontSize:"16px"}}>محتوى المقالة:</label>
          <JoditEditor
            ref={editor}
            value={postInfo.arContent}
            onChange={(newContent) => setPostInfo({ ...postInfo, arContent: newContent })}
            />
        </div>

        <div dir="ltr"> 
        <label style={{fontSize:"16px"}}>Post Content</label>
          <JoditEditor
            ref={editor}
            value={postInfo.enContent}
            onChange={(newContent) => setPostInfo({ ...postInfo, enContent: newContent })}
            />
        </div>

        <div dir="ltr"> 
        <label style={{fontSize:"16px"}}>Контент поста:</label>
          <JoditEditor
            ref={editor}
            value={postInfo.ruContent}
            onChange={(newContent) => setPostInfo({ ...postInfo, ruContent: newContent })}
            />
        </div>
        <Box sx={{ mt: "20px", display: "flex", justifyContent: "end" }}>
          <Button
            onClick={cancelEdit}
            sx={{ textTransform: "capitalize", mr: "10px" }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            variant="contained"
            sx={{ textTransform: "capitalize" }}
          >
            تعديل
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

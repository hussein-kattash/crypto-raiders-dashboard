import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./index.scss";
import Alert from "@mui/material/Alert";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { LoginInfo } from "../../hooks/useAuthentication";
import 'react-toastify/dist/ReactToastify.min.css'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validate, setValidate] = useState(false);
  const [adminInfo, setAdminInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { error, loading, adminLogin } = useAuthentication(adminInfo);
  const handleSubmit = async () => {
    if (!adminInfo.username || !adminInfo.password) {
      setValidate(true);
    } else {
      adminLogin();
    }
  };

  return (
    <>
      <Card className="card">
        <CardContent>
          <Typography variant="h4" textAlign="center">
            تسجيل دخول المسؤول  
          </Typography>
          <Stack component="form" marginTop="50px">
            <FormControl error={!adminInfo.username && validate}>
              <InputLabel htmlFor="username">اسم المستخدم</InputLabel>
              <OutlinedInput
                value={adminInfo.username}
                onChange={(event) =>
                  setAdminInfo({ ...adminInfo, username: event.target.value })
                }
                id="username"
                label="اسم المستخدم"
              />
            </FormControl>
            <FormControl
              error={!adminInfo.password && validate}
              sx={{ marginTop: "30px" }}
              variant="outlined"
            >
              <InputLabel htmlFor="password">كلمة المرور</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={adminInfo.password}
                onChange={(event) =>
                  setAdminInfo({ ...adminInfo, password: event.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff
                          style={{
                            color:
                              !adminInfo.password && validate ? "#d53c49" : "",
                          }}
                        />
                      ) : (
                        <Visibility
                          style={{
                            color:
                              !adminInfo.password && validate ? "#d53c49" : "",
                          }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="كلمة المرور"
              />
            </FormControl>
            <Button
              disabled={loading}
              sx={{ marginTop: "40px" }}
              variant="contained"
              onClick={handleSubmit}
            >
              تسجيل الدخول
            </Button>
            {(!adminInfo.username || !adminInfo.password) && validate && (
              <Alert sx={{ mt: "10px" }} severity="error">
                الرجاء إدخال اسم المستخدم وكلمة المرور
              </Alert>
            )}
            {error && (
              <Alert sx={{ mt: "10px" }} severity="error">
                {error}
              </Alert>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;

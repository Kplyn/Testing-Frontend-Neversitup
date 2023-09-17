import React, { useState, useRef } from "react";
import apiEndpoint from "../../utils/apiEndpoint";
import { useDispatch } from "react-redux";
import { ssoLoginData } from "../../store/ssoLogin/ssoLoginAction";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../components/loading";
import { msg, hed, btn } from "../../utils/popup";
import * as Yup from "yup";
import Swal from 'sweetalert2'

// Material UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const formRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required.")
      .email("Username is invalid not email format.")
      .min(6, "Username must be at least 6 characters.")
      .max(40, "Username must not exceed 40 characters."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters.")
      .max(20, "Password must not exceed 20 characters.")
      .test("consecutive-digits", "Password must not number consecutive digit more than 2 leange.", (value) => {
        return !/(.)\1\1/.test(value);
      })
      .test("sequential-digits", "Password must not number sequential digit more than 2 leange.", (value) => {
        return !/(012|123|234|345|456|567|678|789)/.test(value);
      })
      .test("duplicate-sets", "Password must not number duplicate digit more than 2 sets.", async (value) => {
        let sets = value.match(/(\d)\1*/g) || [];
        const duplicateSets = await sets.filter((set) => set.length > 1);
        return duplicateSets.length <= 2;
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let loginRes = await apiEndpoint.ssoLoign(data);
      if (loginRes.status === 200) {
        dispatch(ssoLoginData(loginRes.data.token));
        navigate(`/todo`);
        setLoading(false);
      } else {
        Swal.fire({
          icon: "warning",
          title: hed.loginFail,
          text: msg.txtLoginFail,
          confirmButtonText: btn.retry,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseLoading = async () => {
    if (loading == true) {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Box
          sx={{
            marginTop: 10,
          }}
        >
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h4">Login</Typography>
          </Grid>
          <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              type="email"
              autoComplete="username"
              autoFocus
              {...register("username")}
              error={errors.username ? true : false}
            />
            <Typography variant="caption" color="error">
              {errors.username?.message}
            </Typography>

            <FormControl
              margin="normal"
              required
              fullWidth
              variant="outlined"
              {...register("password")}
              error={errors.password ? true : false}
              autoComplete="password"
            >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Typography variant="caption" color="error">
              {errors.password?.message}
            </Typography>
            <Button type="submit" fullWidth variant="contained" onClick={handleSubmit(onSubmit)} sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
      <Loading isLoading={loading} handleCloseLoading={handleCloseLoading} />
    </Container>
  );
}

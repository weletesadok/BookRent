import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation } from "./authApiSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  avatar: z.any().optional(),
  phoneNumber: z.string().optional(),
  location: z.string().optional(),
  role: z.enum(["RENTER", "OWNER"]),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

const Register = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [files, setFiles] = useState(null);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "RENTER",
      terms: false,
      email: "",
      password: "",
      phoneNumber: "",
      location: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({
        ...data,
        files,
      }).unwrap();
      toast.success("Registration successful");
      reset();
      setAvatarPreview(null);
      setFiles(null);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.data?.error ?? "Registration failed");
    }
  };

  const handleFileChange = (event) => {
    setFiles(Object.values(event.target.files));
    setAvatarPreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <ToastContainer />
      <Grid container spacing={0} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#171B36",
              color: "#FFFFFF",
            }}
          >
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/education-school/read-book-icon.svg"
              alt="Logo"
              style={{ width: "80px", height: "80px", filter: "invert(100%)" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/education-school/read-book-icon.svg"
                alt="Logo"
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: "8px",
                  filter:
                    "invert(28%) sepia(100%) saturate(7476%) hue-rotate(185deg) brightness(101%) contrast(101%)",
                }}
              />
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Book Rent
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Box sx={{ my: 1, textAlign: "center" }}>
                <label htmlFor="avatar-upload">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e)}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    Upload Avatar
                  </Button>
                </label>
              </Box>
              {avatarPreview && (
                <Box sx={{ my: 1, textAlign: "center" }}>
                  <Avatar
                    src={avatarPreview}
                    alt="Avatar Preview"
                    sx={{ width: 80, height: 80, borderRadius: "50%" }}
                  />
                </Box>
              )}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="dense"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    fullWidth
                    margin="dense"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    margin="dense"
                  />
                )}
              />
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    fullWidth
                    margin="dense"
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    margin="dense"
                    SelectProps={{ native: true }}
                  >
                    <option value="RENTER">Renter</option>
                    <option value="OWNER">Owner</option>
                  </TextField>
                )}
              />
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />}
                    label="I accept the terms and conditions"
                    sx={{ mt: 2 }}
                  />
                )}
              />
              {errors.terms && (
                <Typography variant="body2" color="error">
                  {errors.terms.message}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, fontSize: "0.875rem" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader size={20} color="#FFFFFF" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;

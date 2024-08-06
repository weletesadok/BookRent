import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  remember: z.boolean(),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
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
                Login
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} color="primary" />}
                    label="Remember Me"
                    sx={{ mt: 2 }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, fontSize: "0.875rem" }}
              >
                Login
              </Button>
            </form>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link href="/register" underline="hover">
                Register
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;

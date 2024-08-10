import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBookMutation } from "./bookSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const validationSchema = z.object({
  name: z.string().min(1, "Book name is required"),
  author: z.string().min(1, "Author is required"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
  details: z.string().min(1, "Details are required"),
  files: z.array(z.instanceof(File)).min(1, "At least one file is required"),
  publicationDate: z.string().optional(),
});

const AddBookForm = () => {
  const [filePreviews, setFilePreviews] = useState([]);
  const [addBook, { isLoading }] = useAddBookMutation();
  const auth = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      author: "",
      category: [],
      price: "",
      quantity: "",
      details: "",
      files: [],
      publicationDate: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await addBook({ ...data, ownerId: auth.id }).unwrap();
      toast.success("Book added successfully");
      reset();
      setFilePreviews([]);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setValue("files", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
  };

  const handlePriceChange = (event) => {
    const value = parseFloat(event.target.value);
    setValue("price", isNaN(value) ? "" : value);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setValue("quantity", isNaN(value) ? "" : value);
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue("category", typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "1rem auto",
      }}
    >
      <ToastContainer />

      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Book Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Author"
                  variant="outlined"
                  fullWidth
                  error={!!errors.author}
                  helperText={errors.author?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="category-label"
                    label="Category"
                    multiple
                    value={field.value}
                    onChange={handleCategoryChange}
                    error={!!errors.category}
                  >
                    <MenuItem value="Fiction">Fiction</MenuItem>
                    <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="History">History</MenuItem>
                  </Select>
                )}
              />
              {errors.category && (
                <Typography color="error">{errors.category.message}</Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Price (ETB)"
                  variant="outlined"
                  fullWidth
                  onChange={handlePriceChange}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  onChange={handleQuantityChange}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="publicationDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Publication Date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.publicationDate}
                  helperText={errors.publicationDate?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Details"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.details}
                  helperText={errors.details?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                accept="image/*"
                id="upload-files"
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="upload-files">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  Upload Files
                </Typography>
              </label>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                {filePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                ))}
              </Box>
              {errors.files && (
                <Typography color="error">{errors.files.message}</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader size={20} color="#FFFFFF" /> : "Add Book"}
        </Button>
      </form>
    </Box>
  );
};

export default AddBookForm;

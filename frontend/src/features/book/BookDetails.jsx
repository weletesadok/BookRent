import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Edit, Delete, Star as StarIcon } from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { useGetBookByIdQuery, useDeleteBookMutation } from "./bookSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, error, isLoading } = useGetBookByIdQuery(id);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleEdit = () => {
    navigate(`/book/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteBook(id).unwrap();
      navigate("/book");
    } catch (err) {
      toast.error("Failed to delete the book");
      console.error("Failed to delete the book: ", err);
    }
  };

  const handleRent = () => {
    console.log("Rent button clicked");
  };

  function removeFilesPrefix(input) {
    if (typeof input === "string") {
      return `http://localhost:8000${input.slice(5)}`;
    } else {
      return "https://via.placeholder.com/150x200?text=Book+Cover";
    }
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading book details</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        {book.name}
      </Typography>
      <Card>
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          autoPlay={false}
          sx={{
            height: 400,
            padding: 5,
          }}
        >
          {book.image?.length > 0 ? (
            book.image.map((image, index) => (
              <Box
                key={index}
                sx={{
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  borderRadius: 5,
                }}
              >
                <CardMedia
                  component="img"
                  image={removeFilesPrefix(image)}
                  alt={`Book Image ${index + 1}`}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))
          ) : (
            <Box
              sx={{
                height: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                backgroundColor: "grey.300",
              }}
            >
              <Typography variant="h6">No images available</Typography>
            </Box>
          )}
        </Carousel>
        <CardContent sx={{ backgroundColor: "#F5F5F5" }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "medium", color: "text.primary" }}
                >
                  By {book.author}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "medium", color: "text.primary" }}
                >
                  {book.category.join(", ")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 1,
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  {book.price} ETB
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography
            variant="h6"
            sx={{ mb: 1, color: "text.secondary", fontWeight: "medium" }}
          >
            Details
          </Typography>
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {book.details}
          </Typography>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "medium" }}>
                Rating
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    sx={{
                      color: index < book.rating ? "gold" : "action.disabled",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "space-between",
            padding: 2,
            backgroundColor: "#F5F5F5",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleRent}>
            Borrow
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton color="primary" onClick={handleEdit}>
              <Edit />
            </IconButton>
            {isDeleting ? (
              <ClipLoader size={24} color="red" />
            ) : (
              <IconButton color="error" onClick={handleDelete}>
                <Delete />
              </IconButton>
            )}
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BookDetails;

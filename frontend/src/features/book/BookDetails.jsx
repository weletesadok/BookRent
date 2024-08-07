import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const dummyBook = {
  id: 1,
  name: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  category: "Fiction",
  price: 150,
  details:
    "A classic novel of the Roaring Twenties, exploring themes of wealth, love, and the American Dream.",
  images: [
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/72/200/300",
    "https://picsum.photos/id/3/200/300",
  ],
};

const BookDetails = () => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/book/edit/${dummyBook.id}`);
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const handleRent = () => {
    console.log("Rent button clicked");
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        {dummyBook.name}
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
          {dummyBook.images.map((image, index) => (
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
                image={image}
                alt={`Book Image ${index + 1}`}
                sx={{
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
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
                  By {dummyBook.author}
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
                  {dummyBook.category}
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
                  {dummyBook.price} ETB
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
            {dummyBook.details}
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
                    sx={{ color: index < 4 ? "gold" : "action.disabled" }}
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
            <IconButton color="error" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BookDetails;

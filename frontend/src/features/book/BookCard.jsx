import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default ({ book }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate(`/book/${book.id}`);
  };

  const renderRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon key={index} sx={{ color: index < rating ? "gold" : "gray" }} />
    ));
  };
  function removeFilesPrefix(input) {
    if (typeof input === "string") {
      return `http://localhost:8000${input.slice(5)}`;
    } else {
      return "https://via.placeholder.com/150x200?text=Book+Cover";
    }
  }
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: 2,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        height: "200px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardMedia
        component="img"
        height="200"
        image={book.image ? removeFilesPrefix(book.image[0]) : ""}
        alt={"Book Image"}
        sx={{ transition: "opacity 0.3s ease" }}
      />
      <CardContent
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "10px",
          textAlign: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          transition: "opacity 0.3s ease",
          opacity: hover ? 0 : 1,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontSize: "1rem" }}
        >
          {book.name}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "black",
          padding: "15px",
          opacity: hover ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          transform: hover ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {renderRating(book.rating)}
        </Box>
        <Divider sx={{ width: "100%", mb: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {book.price} ETB
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", mb: 1 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          {book.details}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 1,
            borderRadius: "20px",
            padding: "8px 20px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            ":hover": {
              backgroundColor: "#0086D1",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
          onClick={handleMoreClick}
        >
          More
        </Button>
      </CardContent>
    </Card>
  );
};

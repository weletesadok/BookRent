import { Box } from "@mui/material";
import BookStat from "../features/book/BookStat";
import LiveBookStatus from "../features/book/LiveBookStatus";
import RevenueCard from "../features/revenue/RevenueCard";

export default () => {
  return (
    <Box sx={{ width: "100%", display: "flex", height: "100%", gap: "1rem" }}>
      <Box
        sx={{
          width: "35%",
          height: "100%",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <RevenueCard />
        <BookStat />
      </Box>
      <LiveBookStatus />
    </Box>
  );
};

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useGetBookStatisticsByCategoryQuery } from "./bookSlice";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BookStatisticsChart = () => {
  const { data, error, isLoading } = useGetBookStatisticsByCategoryQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const categoryMap = {};

  data.forEach((item) => {
    item.category.forEach((category) => {
      if (categoryMap[category]) {
        categoryMap[category] += item.availableBooks;
      } else {
        categoryMap[category] = item.availableBooks;
      }
    });
  });

  const chartData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default BookStatisticsChart;

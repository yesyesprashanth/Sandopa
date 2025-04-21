import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const ClinicianCard = ({ rows }) => {
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const navigate = useNavigate();

  // Update filteredRows whenever the rows prop changes
  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  // Handle search by filtering on the "name" field
  const handleSearch = () => {
    const searchResults = rows.filter((row) =>
      row.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRows(searchResults);
  };

  // Dynamically generate columns based on the keys of the first row, then append the custom "Refer Action" column.
  const columns = useMemo(() => {
    if (!rows || rows.length === 0) return [];

    const generatedColumns = Object.keys(rows[0]).map((key) => {
      // Optionally adjust flex for specific fields (e.g. age)
      const flex = key === "age" ? 0.5 : 1;
      return {
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        flex,
        minWidth: 150,
        headerClassName: "small-font",
      };
    });

    generatedColumns.push({
      field: "action",
      headerName: "Refer Action",
      flex: 1,
      headerClassName: "small-font",
      renderCell: () => (
        <Button variant="contained" color="primary" size="small">
          Adopt
        </Button>
      ),
    });

    return generatedColumns;
  }, [rows]);

  return (
    <Card sx={{ color: "#000", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Case List
        </Typography>

        <Grid container spacing={1} alignItems="center" sx={{ maxWidth: 500, margin: "auto" }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="secondary" fullWidth onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>

        <div style={{ flexGrow: 1, width: "100%", marginTop: "5px" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicianCard;

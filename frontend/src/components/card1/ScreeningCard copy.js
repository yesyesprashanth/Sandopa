import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const ScreeningCard = ({ rows }) => {
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
  const navigate = useNavigate();

  // Update filteredRows when rows prop changes
  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  // Filter rows by the "name" field on search
  const handleSearch = () => {
    const searchResults = rows.filter((row) =>
      row.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRows(searchResults);
  };

  // Dynamically generate columns based on the keys in the first row,
  // then append a custom "Actions" column with an "Edit" button.
  const columns = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    
    const generatedColumns = Object.keys(rows[0]).map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      flex: 1,
      minWidth: 150,
      headerClassName: "small-font",
    }));

    generatedColumns.push({
      field: "action",
      headerName: "Actions",
      flex: 0.8,
      headerClassName: "small-font",
      renderCell: () => (
        <Button variant="contained" color="primary">
          Edit
        </Button>
      ),
    });

    return generatedColumns;
  }, [rows]);

  return (
    <Card
      sx={{
        color: "#000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Screening Card
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
          <Grid item xs={3}>
            <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/screening")}>
              Create
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

export default ScreeningCard;

import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const AdoptCard = ({ cardName, data,dataHeading,navigateCreate }) => {
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState(data);
  const navigate = useNavigate();

  // Update filteredRows whenever the rows prop changes
  useEffect(() => {
    setFilteredRows(data);
  }, [data]);

  // Handle search by filtering on the "name" field
  const handleSearch = () => {
    const searchResults = data.filter((row) =>
      row.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRows(searchResults);
  };

  // Dynamically generate columns from the keys of the first row, then add the custom "Actions" column
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const generatedColumns = Object.keys(data[0]).map((key, index) => ({
      field: key,
      headerName: dataHeading[index],
      flex: 1,
      minWidth: 150,
    }));

    // Append the custom "Actions" column
    generatedColumns.push({
      field: "action",
      headerName: "Actions",
      flex: 0.8,
      renderCell: () => (
        <Button variant="contained" color="primary" size="small">
          Adopt
        </Button>
      ),
    });

    return generatedColumns;
  }, [data]);

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
          {cardName}
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
            <Button variant="contained" color="primary" fullWidth onClick={() => navigate(navigateCreate)}>
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

export default AdoptCard;

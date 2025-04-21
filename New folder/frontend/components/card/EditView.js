import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const EditView = ({ cardName, data,dataHeading,navigateCreate,navigateView,navigateEdit }) => {
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState(data);
  const navigate = useNavigate();

  // Update filteredRows when the rows prop changes
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

  // Dynamically generate columns based on the keys in the first row
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Generate a column for each key in the first row
    const generatedColumns = Object.keys(data[0]).map((key,index) => {
      return {
        field: key,
        headerName: dataHeading[index],
        flex: 1,
        minWidth: 150,
      };
    });

    const editHandle = (id)=> {
      navigate(navigateEdit);
    }

    const viewHandle = (id)=> {
      navigate(navigateView);
    }

    
    // Append the fixed "allot" column
    generatedColumns.push({
      field: "allot",
      headerName: "Allot",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" size="small" style={{ marginRight: 5 }} onClick={() => editHandle(params.row.id)} >
            Edit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={() => viewHandle(params.row.id)} >
            View
          </Button>
        </div>
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
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
        {cardName}
        </Typography>

        <Grid container spacing={1} alignItems="center" sx={{ width: "100%", mb: 2 }}>
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

        <div style={{ flexGrow: 1, width: "100%" }}>
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

export default EditView;

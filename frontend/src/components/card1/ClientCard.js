import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const columns = [
    { field: "id", headerName: "ID", flex: 0.5, headerClassName: 'small-font' },
    { field: "name", headerName: "Name", flex: 1, headerClassName: 'small-font' },
    { field: "department", headerName: "Department", flex: 1.5, headerClassName: 'small-font' },
    {
        field: "action",
        headerName: "Actions",
        flex: 0.8,
        headerClassName: 'small-font',
        renderCell: (params) => (
            <Button
                variant="contained"
                color="primary"

            >
                Edit
            </Button>
        ),
    },
];

const rows = [
    { id: 1, name: 'Material 1', department: 'Science' },
    { id: 2, name: 'Material 2', department: 'Mathematics' },
    { id: 3, name: "Charlie", department: 'English' },
];

const ClientCard = () => {
    const [search, setSearch] = useState("");
    const [filteredRows, setFilteredRows] = useState(rows); // Store filtered rows
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSearch = () => {
        // Perform the search when Search button is clicked
        const searchResults = rows.filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredRows(searchResults); // Update the filtered rows
    };

    return (
        <Card sx={{ color: "#000", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" align="center" gutterBottom >
                    Client List
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
                        <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/student")}>
                            Create
                        </Button>
                    </Grid>
                </Grid>


                <div style={{ flexGrow: 1, width: "100%", marginTop: "5px" }}>
                    <DataGrid
                        rows={filteredRows} // Display filtered rows here
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

export default ClientCard;

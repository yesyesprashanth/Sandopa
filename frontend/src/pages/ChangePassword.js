import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
        } else {
            setMessage('Password successfully updated.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className="change-password-page">
            <Container maxWidth="xs">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, padding: 3, borderRadius: 2 }}>

                    <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
                        Change Password
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            label="Current Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            margin="normal"
                            size="small"
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            margin="normal"
                            required
                            size="small"
                        />
                        <TextField
                            label="Confirm New Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            margin="normal"
                            required
                            size="small"

                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Update Password
                        </Button>
                    </form>
                    {message && <Typography variant="body2" color={message.includes("match") ? "success.main" : "error.main"} sx={{ mt: 2 }}>
                        {message}
                    </Typography>}
                </Box>
            </Container>
        </div>
    );
};

export default ChangePassword;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending a password reset email
        setMessage(`Password reset link has been sent to ${email}`);
        setTimeout(() => navigate('/change-password'), 3000); // Simulate redirect
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 1, p: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" align="center" gutterBottom sx={{ color: "#a5e526" }}>
                    Forgot Password
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        size="small"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Send Reset Link
                    </Button>
                </form>

                {message && (
                    <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default ForgotPassword;

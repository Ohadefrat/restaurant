// pages/about.tsx
'use client'
import { Box, Typography } from '@mui/material';
import React from 'react';

const AboutPage = () => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h3" gutterBottom color="white">
                About Us
            </Typography>
            <Typography variant="body1" color="white">
                Welcome to our website! This is the about page where you can provide information about your
                company, team, or yourself.
            </Typography>
            {/* Add more content or sections as needed */}
        </Box>
    );
};

export default AboutPage;

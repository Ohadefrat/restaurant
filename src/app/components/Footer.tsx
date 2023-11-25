import { Box, Typography } from '@mui/material';
import { Raleway } from 'next/font/google';
const raleway = Raleway({ subsets: ['latin'], weight: [] })
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#00000030',
        color: '#fff',
        py: 3, // Adjust padding as needed
        textAlign: 'center',
        bottom: 0, // Align to the bottom
        left: 0, // Align to the left
        width: '100%', // Take full width of the viewport
        fontFamily: raleway.style
      }}
    >
      <Typography variant="body2" sx={{ fontFamily: raleway.style }} >
        This is a sample footer. Replace this text with your footer content.
      </Typography>
    </Box>
  );
};

export default Footer;

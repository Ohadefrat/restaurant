import { Box, Grid, Link, Typography } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000000',
        color: '#fff',
        py: 3,
        fontFamily: 'raleway.style',
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Grid container justifyContent="center" sx={{ width: '100%' }}>
        {/* Services Section */}
        <Grid item xs={12} sm={4} className="mb-6">
          <Typography variant="h6" align="center">
            Services
          </Typography>
          <Box>
            <Link href="/about" target="_blank" rel="noopener noreferrer">
              <Typography variant="subtitle2" align="center">
                About
              </Typography>
            </Link>
          </Box>
        </Grid>

        {/* Follow Us Section */}
        <Grid item xs={12} sm={4} md={4} className="mb-6">
          <Typography variant="h6" align="center">
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1%' }}>
            <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} style={{ color: '#3b5998', marginRight: '10px' }} />
            </Link>
            <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} style={{ color: '#1DA1F2', marginRight: '10px' }} />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} style={{ color: '#c32aa3' }} />
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Text */}
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Ohad Efrat. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

import { Box, Grid, Link, Typography, useTheme } from "@mui/material";
import { Raleway } from "next/font/google";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaInfo,
} from "react-icons/fa";

const raleway = Raleway({ subsets: ["latin"], weight: [] });

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000000",
        color: "#fff",
        py: 3,
        bottom: 0,
        left: 0,
        width: "100%",
        fontFamily: raleway.style,
        padding: theme.spacing(4),
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Grid
        container
        justifyContent="center" // Align the items horizontally at the center
        sx={{ width: "100%" }} // Adjust height as needed
      >
        <Grid item xs={12} sm={4} className={"mb-6"}>
          <Typography variant="h6" align="center">
            Services
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              direction="column"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >

              <Grid item xs={1}>
                <Link href="/About" target="_blank" rel="noopener noreferrer">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <Link
                      href="/About"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        align="center"
                        className="ml-1"
                      >
                        About
                      </Typography>
                    </Link>
                  </Box>
                </Link>
              </Grid>{" "}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4} className={"mb-6"}>
          <Typography variant="h6" align="center">
            Follow Us
          </Typography>
          <Box sx={{ flexGrow: 1, marginTop: "1%" }}>
            <Grid
              container
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {/* Your items in a row */}
              <Grid item xs={1}>
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={24} style={{ color: "#3b5998" }} />
                </Link>{" "}
              </Grid>
              <Grid item xs={1}>
                <Link
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={24} style={{ color: "#1DA1F2" }} />
                </Link>{" "}
              </Grid>
              <Grid item xs={1}>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={24} style={{ color: "#c32aa3" }} />
                </Link>{" "}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Ohad Efrat. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

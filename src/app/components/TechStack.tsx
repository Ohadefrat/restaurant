"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"], weight: [] });

interface TechItemProps {
  name: string;
  logo: string;
}
const TechItem: React.FC<TechItemProps> = ({ name, logo }) => {
  return (
    <Card sx={{ backgroundColor: "#00000060" }}>
      <CardContent sx={{ color: "white" }}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar
              src={logo}
              alt={`${name} logo`}
              sx={{
                width: 40, // Set the width as per your requirement
                height: 40, // Set the height as per your requirement
                marginRight: 1, // Add margin for separation
                backgroundColor: "white",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ fontFamily: raleway.style }}>
              {name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Usage example:
const TechStack = () => {
  const technologies = [
    { name: "React", logo: "/assets/react.png" },
    { name: "NextJS", logo: "/assets/Nextjs.png" },
    { name: "Python", logo: "/assets/python.png" },
    { name: "C#", logo: "/assets/c-sharp.png" },
    { name: "Android Studio", logo: "/assets/android-studio.png" },
    { name: "NodeJS", logo: "/assets/Nodejs.png" },
    { name: "Docker", logo: "/assets/docker.png" },
    { name: "GitHub", logo: "/assets/github.png" },
    { name: "Linux", logo: "/assets/LiNUX.png" },
    { name: "AWS", logo: "/assets/aws.png" },
    { name: "Prisma", logo: "/assets/prisma.png" },
    { name: "Firebase", logo: "/assets/firebase.png" },
  ];
  return (
    <Container>
      <Box padding={2}>
        <Typography
          variant="h6"
          gutterBottom
          color="white"
          sx={{ fontFamily: raleway.style }}
        >
          Technologies I Work With
        </Typography>
        <Grid container spacing={2}>
          {technologies.map((tech, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <TechItem name={tech.name} logo={tech.logo} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TechStack;

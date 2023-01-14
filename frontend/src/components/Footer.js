import React from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  const navigate = useNavigate();

  const links = [
    { text: "Inicio", onClick: () => navigate('/') },
    { text: "Tienda", onClick: () => navigate('/products') },
    { text: "Sobre nosotros", onClick: () => navigate('/aboutus') },
    { text: "Preguntas frecuentes", onClick: () => navigate('/terms') },
  ];

  return (
    <Box component="footer" sx={{ mt: 'auto' }} >
      <Container maxWidth="xl">
        <Divider />
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1}>
            {links?.map((link) => (
              <Typography key={link.text}
                variant="body2"
                color="text.primary"
                sx={{ cursor: "pointer" }}
                onClick={link.onClick}>
                {link.text}
              </Typography>
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <IconButton >
              <FacebookIcon color="primary" />
            </IconButton>
            <IconButton>
              <InstagramIcon color="primary" />
            </IconButton>
            <IconButton >
              <WhatsAppIcon color="primary" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

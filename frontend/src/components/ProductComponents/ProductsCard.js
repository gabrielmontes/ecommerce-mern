import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ProductsCard = (props) => {  
  return (
    <div onClick={props.onClick}>
      <Card padding={0}>
        <CardActionArea >
          <CardMedia
            component="img"
            src={props.image}
            alt={props.name}
            height={props.height}
            sx={{
              objectFit: "cover",
              transition: "all 300ms ease-out",
              ':hover': {
                "&:hover": {
                  transform: "scale3d(1.05, 1.05, 1.0)",
                  transition: "all 300ms ease-in",
                },
              },
            }}
          />
          <CardContent>
            <Typography variant="h5" align="center">
              {props.name}
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default ProductsCard;
import React from 'react';
import Main from '../src/components/Main';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://mui.com//static/images/cards/contemplative-reptile.jpg"
          alt="MyExpenses"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            MyExpenses
            <Link
  onClick={(
    
  ) => {
    return <Main />
  }}
>

</Link>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

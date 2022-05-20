import * as React from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography
} from '@mui/material';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

export default function RoomCard(props) {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           Status {props.room.used  ? 'Close' : 'Open'}
          </Typography>
          <Typography variant="h5" component="div">
            {props.room.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Price {props.room.used}
          </Typography>
          <Typography variant="body2">
            Capacity: {props.room.capacity} | Extra Cost {props.room.extra_value_per_person}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>
    );
  }
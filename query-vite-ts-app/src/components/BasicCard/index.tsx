import * as React from 'react';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

interface BasicCardProps {
  date: string;
  title: string;
  author: string;
  content: string;
  link: string;
}

const BasicCard: React.FC<BasicCardProps> = ({ date, title, author, content, link }) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {dayjs(date).format('DD MMM YYYY')}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {author}
        </Typography>
        <Typography variant="body2">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={link}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default BasicCard;

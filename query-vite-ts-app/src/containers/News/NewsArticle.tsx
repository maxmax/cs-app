import * as React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from "react-router-dom";

import { useArticle } from './api';

export default function NewsArticle() {

  const { id } = useParams();
  const { status, data, error } = useArticle(id ?? '');

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {!data || !id || status === 'pending' ? (
          <LinearProgress />
        ) : error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              <Typography variant="h4" component="h1" gutterBottom>
                {data?.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {data?.content}
              </Typography>
              <Link to={`/news`}>
                {'Back'}
              </Link>
            </div>
          </>
        )}
      </Box>
    </Container>
  );
}

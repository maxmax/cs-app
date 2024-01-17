import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from "react-router-dom";

import { usePosts } from './api';

export default function Notes() {

  const { status, data, error, isFetching } = usePosts();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Notes
        </Typography>
        {status === 'loading' ? (
          <LinearProgress />
        ) : error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data?.map((post) => (
                <p key={post.id}>
                  <Link to={`/notes/${post.id}`}>
                    {post.title}
                  </Link>
                </p>
              ))}
            </div>
            {isFetching ? 'Background Updating...' : ' '}
          </>
        )}
      </Box>
    </Container>
  );
}

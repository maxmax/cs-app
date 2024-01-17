import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { BasicCard } from "../../components";

import { useNews } from './api';

export default function News() {

  const { status, data, error } = useNews();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          News
        </Typography>
        {status === 'loading' ? (
          <LinearProgress />
        ) : error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data?.map((post) => (
                <Box key={post.id} sx={{ mb: 2 }}>
                  <BasicCard
                    date={post.createdAt}
                    title={post.title}
                    author={post.author.name}
                    content={post.content}
                    link={`/news/${post.id}`}
                    linkText={'Learn More'}
                  />
                </Box>
              ))}
            </div>
          </>
        )}
      </Box>
    </Container>
  );
}

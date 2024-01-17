import * as React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { BasicCard } from "../../components";

import { useArticle } from './api';

export default function NewsPage() {

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
            <BasicCard
              title={data.title}
              content={data.content}
              link={'/news'}
              linkText={'Back'}
            />
          </>
        )}
      </Box>
    </Container>
  );
}

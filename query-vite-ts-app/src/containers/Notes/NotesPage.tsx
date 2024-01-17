import * as React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { BasicCard } from "../../components";

import { usePost } from './api';

export default function NotesPage() {

  const { id } = useParams();
  const { status, data, error, isFetching } = usePost(id ?? '');

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
              content={data.body}
              link={'/'}
              linkText={'Back'}
            />
            {isFetching ? 'Background Updating...' : ' '}
          </>
        )}
      </Box>
    </Container>
  );
}

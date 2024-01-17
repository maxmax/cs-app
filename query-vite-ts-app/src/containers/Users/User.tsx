import * as React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from "react-router-dom";

import { useUser } from './api';

export default function User() {

  const { id } = useParams();
  const { status, data, error } = useUser(id ?? '');

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
                {data?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {data?.email}
              </Typography>
              <Link to={`/users`}>
                {'Back'}
              </Link>
            </div>
          </>
        )}
      </Box>
    </Container>
  );
}

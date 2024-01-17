import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Virtuoso } from 'react-virtuoso';

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
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List>
              <Virtuoso
                style={{ height: '76vh' }}
                totalCount={data.length}
                itemContent={index => (
                  <ListItem sx={{p: 0}} divider>
                    <ListItemButton to={`/notes/${data[index].id}`}>
                      <ListItemText primary={data[index].title} />
                    </ListItemButton>
                  </ListItem>
                )}
              />
            </List>
            {isFetching ? 'Background Updating...' : ' '}
          </Box>
        )}
      </Box>
    </Container>
  );
}

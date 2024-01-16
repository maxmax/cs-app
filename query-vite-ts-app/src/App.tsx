import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Notes from './containers/Notes';
import NotesPage from './containers/NotesPage';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/notes/:id" element={<NotesPage />} />
      </Routes>
    </Container>
  );
}

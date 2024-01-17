import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Notes from './containers/Notes';
import NotesPage from './containers/Notes/NotesPage';
import News from './containers/News';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/notes/:id" element={<NotesPage />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Container>
  );
}
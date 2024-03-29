import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Notes from './containers/Notes';
import NotesPage from './containers/Notes/NotesPage';
import News from './containers/News';
import NewsPage from './containers/News/NewsPage'
import Users from './containers/Users'
import User from './containers/Users/User'

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/notes/:id" element={<NotesPage />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </AppLayout>
  );
}

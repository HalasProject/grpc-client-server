import React from 'react';
import Home from './sections/Home.jsx';
import { SettingsProvider } from './contexts/SettingsContext';
import { BookProvider } from './contexts/BookContext';

function App() {
  return (
    <SettingsProvider>
      <BookProvider>
        <Home />
      </BookProvider>
    </SettingsProvider>
  );
}

export default App;

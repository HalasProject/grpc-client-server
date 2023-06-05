import React, { useContext } from 'react';
import { Books } from '../components/Books';
import Popup from '../components/Popup';
import { SettingsContext } from '../contexts/SettingsContext';

function Home() {
  const { isModalOpen } = useContext(SettingsContext);
  return (
    <div>
      {isModalOpen && <Popup />}
      <Books />
    </div>
  );
}

export default Home;

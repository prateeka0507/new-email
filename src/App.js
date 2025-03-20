// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Import from './pages/Import';
import SendEmail from './pages/SendEmail';
import ListSelector from './components/ListSelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [selectedList, setSelectedList] = useState('');

  const handleListChange = (listId) => {
    setSelectedList(listId);
    // You can perform additional actions when a list is selected
    console.log('Selected list:', listId);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/import" element={<Import />} />
            <Route path="/send" element={<SendEmail />} />
          </Routes>
          <div className="row">
            <div className="col-md-6">
              <ListSelector onChange={handleListChange} />
              {selectedList && (
                <p>Selected List ID: {selectedList}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
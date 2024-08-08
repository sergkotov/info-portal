import '../../style/style.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage, ComicsPage } from '../pages';
import AppHeader from '../appHeader/AppHeader';

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/comics" element={<ComicsPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
import '../../style/style.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage, ComicsPage, SingleComicPage } from '../pages';
import AppHeader from '../appHeader/AppHeader';
import Page404 from '../pages/Page404';

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader/>
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/comics" element={<ComicsPage/>}/>
            <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
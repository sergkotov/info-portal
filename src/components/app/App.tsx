import React from 'react';
import '../../style/style.scss';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';

import decoration from '../../resources/img/vision.png';

function App() {
  return (
    <div className="app">
        {/* <AppHeader/> */}
        <main>
            <RandomChar/>
            <div className="char__content">
                <CharList/>
                {/* <CharInfo/> */}
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
    </div>
  );
}

export default App;

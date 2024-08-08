// import React, { useState } from 'react';
import '../../style/style.scss';
import React from 'react';
// import RandomChar from '../randomChar/RandomChar';
// import CharList from '../charList/CharList';
// import CharInfo from '../charInfo/CharInfo';
import ComicsList from '../comicsList/ComicsList';

// import decoration from '../../resources/img/vision.png';

function App() {
  // const [selectedChar, setSelectedChar] = useState<number|null>(null);

  // const onSelectChar = (id: number) => {
  //   setSelectedChar(id);
  // }

  return (
    <div className="app">
        {/* <AppHeader/> */}
        <main>
            {/* <RandomChar/>
            <div className="char__content">
                <CharList selectChar={onSelectChar}/>
                {<CharInfo charId={selectedChar}/>}
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/> */}
            <ComicsList/>
        </main>
    </div>
  );
}

export default App;

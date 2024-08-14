import React, { FC, useState } from "react";
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import CharSearchForm from "../charSearchForm/CharSearchForm";

import decoration from '../../resources/img/vision.png';

const MainPage: FC = () => {
    const [selectedChar, setSelectedChar] = useState<number|null>(null);

    const onSelectChar = (id: number) => {
      setSelectedChar(id);
    }
    
    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList selectChar={onSelectChar}/>
                <div>
                    <CharInfo charId={selectedChar}/>
                    <CharSearchForm/>
                </div>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;
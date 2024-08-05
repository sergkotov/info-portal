import React, { FC } from "react";
import { CharacterInfo } from "../../../types/types";

const CharInfoView: FC<{char: CharacterInfo}> = ({char}) => {
    return (
    <>
        <div className="char__basics">
            <img src={char.thumbnail} alt={char.name}/>
            <div>
                <div className="char__info-name">{char.name}</div>
                <div className="char__btns">
                    <a href={char.homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={char.wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">{char.description}</div>
        <div className="char__comics">Comics:</div>
        {char.comics && char.comics.length > 0 && 
        <ul className="char__comics-list">
            {
                char.comics.map((item, index) => (
                    <li key={index} className="char__comics-item">
                        {item.name}
                    </li>
                ))
            }
        </ul>}
    </>
    )
}

export default CharInfoView;
import React, { FC, useEffect, useState, MouseEvent  } from "react";
import './RandomChar.scss';
import { Character } from "../../types/types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../app/errorMessage/ErrorMessage";

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar: FC = ()  => {
    const [character, setCharacter] = useState<Character>({id: 0, name: '', description: '', 
        thumbnail: '', homepage: '', wiki: ''});

    const {loading, error, clearError, getCharacter} = MarvelService();

    useEffect(() => {
        updateRandomChar();
    }, []);

    function updateRandomChar() {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id).then(res => {
            if(res) {
                setCharacter(res);
            }
        });
    }

    const onUpdateRandomChar = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        updateRandomChar();
    }

    return (
        <div className="randomchar">
            {error && <ErrorMessage/>}
            {loading && <Spinner/>}
            {!(error || loading) && <RandomCharView char={character}/>}
            <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={(e) => onUpdateRandomChar(e)}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
        </div>
    )
}

const RandomCharView: FC<{char: Character}> = 
    ({char}) => {
        const {name, description, thumbnail, homepage, wiki} = char;
        const imgClasses = (thumbnail.indexOf('image_not_available') === -1) ? "randomchar__img" : "randomchar__img randomchar__img_nf";
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imgClasses} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;
import React, { FC, useState, useEffect } from 'react';
import './CharList.scss';
import { CharacterShort } from '../../types/types';
import { getAllCharacters } from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../app/errorMessage/ErrorMessage";
import CharListItem from './CharListItem/CharListItem';

const CharList: FC = () => {
    const [chars, setChars] = useState<CharacterShort[] | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCharacters().then(res => {
            if(res) {
                onCharsLoaded(res);
            }
        }).catch(onError);
    }, []);

    const onCharsLoaded = (chars: CharacterShort[]) => {
        setLoading(false);
        setChars(chars)
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    return (
        <div className="char__list">
            {error && <ErrorMessage/>}
            {loading && <Spinner/>}
            {!(error || loading) && <CharListItem chars={chars}/>}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;
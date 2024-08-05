import React, { FC, useState, useEffect, MouseEvent } from 'react';
import './CharList.scss';
import { CharacterShort } from '../../types/types';
import { getAllCharacters } from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../app/errorMessage/ErrorMessage";
import CharListItem from './CharListItem/CharListItem';

const CharList: FC<{selectChar: (id: number) => void}> = ({selectChar}) => {
    const [chars, setChars] = useState<CharacterShort[] | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(0);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => {
        getAllCharacters(pagination).then(res => {
            if(res) {
                onCharsLoaded(res);
            }
        }).catch(onError);
    }, [pagination]);

    const onCharsLoaded = (newChars: CharacterShort[]) => {
        if(newChars.length < 9) {
            setCharEnded(true);
        }
        setLoading(false);
        setNewItemsLoading(false);
        if(chars) {
            setChars(state => {
                if(state) {
                    return [...state, ...newChars];
                } else {
                    return state;
                }
            });
        } else {
            setChars(newChars);
        }        
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onPaginationClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setNewItemsLoading(true);
        setPagination(state => state + 1);
    }

    return (
        <div className="char__list">
            {error && <ErrorMessage/>}
            {loading && <Spinner/>}
            {!(error || loading) && <CharListItem chars={chars} selectChar={selectChar}/>}
            <button 
                className="button button__main button__long"
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={(e) => onPaginationClick(e)}
                disabled={newItemsLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;
import React, { FC, useState, useEffect } from 'react';
import './SingleCharacterPage.scss';
import { useParams } from 'react-router-dom';
import { Character } from '../../types/types';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../app/errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleCharacterPage: FC = () => {
    const {charId} = useParams();
    const [char, setChar] = useState<Character | null>(null);
    const {loading, error, getCharacter, clearError} = MarvelService();

    function updateInfoChar(id: string) {
        clearError();
        getCharacter(+id).then(res => {
            if(res) {
                setChar(res);
            }
        });
    }

    useEffect(() => {
        if(charId) {
            updateInfoChar(charId);
        }
    }, [charId]);

    return (
        <div className="char__info">
            {error && <ErrorMessage/>}
            {loading && <Spinner/>}
            {!(error || loading) && <SingleCharView char={char}/>}
        </div>
    )
}

const SingleCharView: FC<{char: Character | null}> = ({char}) => {
    if(char) {
        return (
            <div className="single-comic">
                <img src={char.thumbnail} alt={char.name} className="single-comic__char-img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{char.name}</h2>
                    <p className="single-comic__descr">{char.description}</p>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default SingleCharacterPage;
import React, { FC, useState, useEffect } from 'react';
import './SingleComicPage.scss';
import { Link, useParams } from 'react-router-dom';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../app/errorMessage/ErrorMessage';
import { Comic } from '../../types/types';

const SingleComicPage: FC = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState<Comic | null>(null);
    const {loading, error, getComic, clearError} = MarvelService();

    function updateInfoChar(id: string) {
        clearError();
        getComic(id).then(res => {
            if(res) {
                setComic(res);
            }
        });
    }

    useEffect(() => {
        if(comicId) {
            updateInfoChar(comicId);
        }
    }, [comicId]);

    return (
        <div className="char__info">
            {error && <ErrorMessage/>}
            {loading && <Spinner/>}
            {!(error || loading) && <SingleComicView comic={comic}/>}
        </div>
    )
}

const SingleComicView: FC<{comic: Comic | null}> = ({comic}) => {
    if(comic) {
        return (
            <div className="single-comic">
                <img src={comic.thumbnail} alt={comic.title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comic.title}</h2>
                    <p className="single-comic__descr">{comic.description}</p>
                    <p className="single-comic__descr">{comic.pageCount}</p>
                    <p className="single-comic__descr">{comic.language}</p>
                    <div className="single-comic__price">{comic.price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    } else {
        return null;
    }
}

export default SingleComicPage;
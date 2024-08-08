import React, { FC, MouseEvent, useEffect, useState } from 'react';
import './ComicsList.scss';
import ComicsListItem from './ComicsListItem/ComicsListItem';
import MarvelService from '../../services/MarvelService';
import { Comic } from '../../types/types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../app/errorMessage/ErrorMessage';

const ComicsList: FC = () => {
    const [comics, setComics] = useState<Comic[] | null>(null);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [pagination, setPagination] = useState(0);

    const {loading, error, getAllComics} = MarvelService();
    
    useEffect(() => {
        getAllComics(pagination).then(res => {
            if(res) {
                onComicsLoaded(res);
            }
        });
    }, [pagination]);

    const onComicsLoaded = (newComics: Comic[]) => {
        if(newComics.length < 8) {
            setComicsEnded(true);
        }
        setNewItemsLoading(false);
        if(comics) {
            setComics(state => {
                if(state) {
                    return [...state, ...newComics];
                } else {
                    return state;
                }
            });
        } else {
            setComics(newComics);
        }
    }

    const onPaginationClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setNewItemsLoading(true);
        setPagination(state => state + 1);
    }

    return (
        <div className="comics__list">
            {error && <ErrorMessage/>}
            {loading && !newItemsLoading && <Spinner/>}
            {<ComicsListItem comics={comics}/>}
            <button 
                disabled={newItemsLoading} 
                style={{'display' : comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={(e) => onPaginationClick(e)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
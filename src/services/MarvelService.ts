import { useHttp } from "../hooks/http.hook";
import { Character, CharacterServerData, CharacterShort, CharacterInfo, Comic, ComicServerData } from "../types/types";

const MarvelService = () => {
    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = `apikey=${process.env.REACT_APP_API_KEY}`;
    const _baseOffset = 210;
    const _limit = 9;
    const _baseComicsOffset = 0;
    const _limitComics = 8;

    const {loading, error, request, clearError} = useHttp();

    function _transformCharacter(char: CharacterServerData) : Character {
        return {
            id: char.id || 0,
            name: char.name || '',
            description: char.description || 'No description for now',
            thumbnail: (char.thumbnail?.path || '') + '.' + (char.thumbnail?.extension || ''),
            homepage: (char.urls && char.urls[0].url) ? char.urls[0].url : '',
            wiki: (char.urls && char.urls[1].url) ? char.urls[1].url : ''
        }
    }

    function _transformCharacterInfo(char: CharacterServerData) : CharacterInfo {
        return {
            id: char.id || 0,
            name: char.name || '',
            description: char.description || 'No description for now',
            thumbnail: (char.thumbnail?.path || '') + '.' + (char.thumbnail?.extension || ''),
            homepage: (char.urls && char.urls[0].url) ? char.urls[0].url : '',
            wiki: (char.urls && char.urls[1].url) ? char.urls[1].url : '',
            comics: (char.comics?.items || [])
        }
    }

    function _transformCharacterNameAndThumb(char: CharacterServerData) : CharacterShort {
        return {
            id: char.id || 0,
            name: char.name || '',
            thumbnail: (char.thumbnail?.path || '') + '.' + (char.thumbnail?.extension || '')
        }
    }

    function _transformComic(comic: ComicServerData) : Comic {
        return {
            id: comic.id || 0,
			title: comic.title || "",
			description: comic.description || "There is no description",
			pageCount: comic.pageCount ? `${comic.pageCount} p.` : "No information about the number of pages",
			thumbnail: (comic.thumbnail?.path || "") + "." + (comic.thumbnail?.extension || ""),
			language: (comic.textObjects && comic.textObjects.length > 0 && comic.textObjects[0].language) ? comic.textObjects[0].language : "en-us",
			price:(comic.prices && comic.prices.length > 0 && comic.prices[0].price) ? `${comic.prices[0]?.price}$` : "not available"
        }
    }

    async function getAllServerCharacters(offset: number) {
        const res =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data?.results.filter(_transformCharacter);
    }

    async function getAllServerComics(offset: number) {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data?.results.filter(_transformComic);
    }

    const getAllCharacters = async (offset=0) => {
        const res = await getAllServerCharacters(_baseOffset + offset * _limit);
        if(res) {
            return res.map(_transformCharacterNameAndThumb);
        }
        return null;
    }

    const getCharacter = async (id: number) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        if(res.data?.results[0]) {
            return _transformCharacter(res.data.results[0]);
        }
    }

    const getCharacterInfo = async (id: number) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        if(res.data?.results[0]) {
            return _transformCharacterInfo(res.data.results[0]);
        }
    }

    const getAllComics = async (offset=0) => {
        const res = await getAllServerComics(_baseComicsOffset + offset * _limitComics);
        if(res) {
            return res.map(_transformComic);
        }
        return null;
    }

    const getComic = async (id: string) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getCharacterInfo, getAllComics, getComic}
}

export default MarvelService;
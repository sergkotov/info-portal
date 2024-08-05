import { Character, CharacterServerData, CharactersServerData, CharacterShort, CharacterInfo } from "../types/types";

const _apiBase = "https://gateway.marvel.com:443/v1/public/";
const _apiKey = `apikey=${process.env.REACT_APP_API_KEY}`;
const _baseOffset = 210;
const _limit = 9;

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

async function getResource(url: string) : Promise<CharactersServerData> {
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
}

async function getAllServerCharacters(offset: number) {
    const res =  await getResource(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data?.results.filter(_transformCharacter);
}

export async function getAllCharacters(offset=0) {
    const res = await getAllServerCharacters(_baseOffset + offset * _limit);
    if(res) {
        return res.map(_transformCharacterNameAndThumb);
    }
    return null;
}

export async function getCharacter(id: number) {
    const res = await getResource(`${_apiBase}characters/${id}?${_apiKey}`);
    if(res.data?.results[0]) {
        return _transformCharacter(res.data.results[0]);
    }
}

export async function getCharacterInfo(id: number) {
    const res = await getResource(`${_apiBase}characters/${id}?${_apiKey}`);
    if(res.data?.results[0]) {
        return _transformCharacterInfo(res.data.results[0]);
    }
}
import { Character, CharacterServerData, CharactersServerData, CharacterShort } from "../types/types";

const _apiBase = "https://gateway.marvel.com:443/v1/public/";
const _apiKey = `apikey=${process.env.REACT_APP_API_KEY}`;

function _transformCharacter(char: CharacterServerData) : Character {
    return {
        name: char.name || '',
        description: char.description || 'No description for now',
        thumbnail: (char.thumbnail?.path || '') + '.' + (char.thumbnail?.extension || ''),
        homepage: (char.urls && char.urls[0].url) ? char.urls[0].url : '',
        wiki: (char.urls && char.urls[1].url) ? char.urls[1].url : ''
    }
}

function _transformCharacterNameAndThumb(char: CharacterServerData) : CharacterShort {
    return {
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

async function getAllServerCharacters() {
    const res =  await getResource(`${_apiBase}characters?limit=9&offset=150&${_apiKey}`);
    return res.data?.results.filter(_transformCharacter);
}

export async function getAllCharacters() {
    const res = await getAllServerCharacters();
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
import { Character, CharacterServerData, CharactersServerData } from "../types/types";

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

async function getResource(url: string) : Promise<CharactersServerData> {
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
}

export async function getAllCharacters() {
    const res =  await getResource(`${_apiBase}characters?limit=9&offset=150&${_apiKey}`);
    return res.data?.results.filter(_transformCharacter);
}

export async function getCharacter(id: number) {
    const res = await getResource(`${_apiBase}characters/${id}?${_apiKey}`);
    if(res.data?.results[0]) {
        return _transformCharacter(res.data.results[0]);
    }
}
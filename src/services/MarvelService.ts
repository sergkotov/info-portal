const _apiBase = "https://gateway.marvel.com:443/v1/public/";
const _apiKey = `apikey=${process.env.REACT_APP_API_KEY}`;

async function getResource(url: string) {
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
}

export function getAllCharacters() {
    return getResource(`${_apiBase}characters?limit=9&offset=150&${_apiKey}`);
}

export function getCharacter(id: number) {
    return getResource(`${_apiBase}characters/${id}?${_apiKey}`);
}
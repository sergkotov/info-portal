export interface Character {
    name: string,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string
}

interface CharacterURL {
    type?: string,
    url?: string
}

interface CharacterImage {
    path?: string,
    extension?: string
}

interface CharacterComicSummary {
    resourceURI?: string,
    name?: string
}

interface CharacterComicList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: CharacterComicSummary[]
}

interface CharacterStorySummary {
    resourceURI?: string,
    name?: string,
    type?: string
}

interface CharacterStoryList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: CharacterStorySummary[]
}

interface CharacterEventSummary {
    resourceURI?: string,
    name?: string
}

interface CharacterEventList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: CharacterEventSummary[]
}

interface CharacterSeriesSummary {
    resourceURI?: string,
    name?: string
}

interface CharacterSeriesList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: CharacterSeriesSummary[]
}

export interface CharacterServerData {
    id?: number,
    name?: string,
    description?: string,
    modified?: Date,
    resourceURI?: string,
    urls?: CharacterURL[],
    thumbnail?: CharacterImage,
    comics?: CharacterComicList,
    stories?: CharacterStoryList,
    events?: CharacterEventList,
    series: CharacterSeriesList
}

export interface CharactersServerData {
    code?: number,
    status?: string,
    copyright?: string,
    attributionText?: string,
    attributionHTML?: string,
    etag?: string,
    data?: {
        offset?: number,
        limit?: number,
        total?: number,
        count?: number,
        results: CharacterServerData[]
    }
}
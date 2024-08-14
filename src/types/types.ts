export interface Character {
    id: number,
    name: string,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string
}

export interface CharacterInfo extends Character {
    comics?: CharacterComicSummary[]
}

export type  CharacterSingle = Pick<Character, "name" | "thumbnail" | "description">

export type CharacterShort = Pick<Character, "id" | "name" | "thumbnail">

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

export interface ComicsServerData {
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
        results: ComicServerData[]
    }
}

export interface ComicServerData {
    id?: number,
    digitalId?: number,
    title?: string,
    issueNumber?: number,
    variantDescription?: string,
    description?: string,
    modified?: Date,
    isbn?: string,
    upc?: string,
    diamondCode?: string,
    ean?: string,
    issn?: string,
    format?: string,
    pageCount?: number,
    textObjects?: TextObject[],
    resourceURI?: string,
    urls?: ComicsUrl[],
    series?: SeriesSummury,
    variants?: ComicSummary[],
    collections?: ComicSummary[],
    collectedIssues?: ComicSummary[],
    dates?: ComicDate[],
    prices?: ComicPrice[],
    thumbnail?: ComicImage,
    images?: ComicImage[],
    creators?: CreatorList,
    characters?: CharacterList,
    stories?: StoryList,
    events?: EventList
}

interface TextObject {
    type?: string,
    language?: string,
    text?: string
}

interface ComicsUrl {
    type?: string,
    url?: string
}

interface SeriesSummury {
    resourceURI?: string,
    name?: string
}

interface ComicSummary {
    resourceURI?: string,
    name?: string
}

interface ComicDate {
    type?: string,
    date?: Date
}

interface ComicPrice {
    type?: string,
    price?: number
}

interface ComicImage {
    path?: string,
    extension?: string
}

interface CreatorList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: CreatorSummary
}

interface CharacterList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: CharacterSummary
}

interface StoryList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: StorySummary
}

interface EventList {
    available?: number,
    returned?: number,
    collectionURI?: string,
    items?: EventSummary
}

interface CreatorSummary {
    resourceURI?: string,
    name?: string,
    role?: string
}

interface CharacterSummary {
    resourceURI?: string,
    name?: string,
    role?: string
}

interface StorySummary {
    resourceURI?: string,
    name?: string,
    role?: string
}

interface EventSummary {
    resourceURI?: string,
    name?: string,
}

export interface Comic {
    id: number,
    title: string,
    description: string,
    pageCount: string,
    thumbnail: string,
    language: string,
    price: string
}
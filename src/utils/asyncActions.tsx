// useCases/FetchHeroesUseCase.ts
import axios from "axios";
import { FetchHeroes } from "./Util";

export const fetchRandomCharacter = async (): Promise<ICharacters[]> => {
    const url = `${FetchHeroes}&offset=${Math.floor(Math.random() * (1543 - 0 + 1)) + 0}`;
    const res = await axios.get(url);
    return res.data.data.results;
};

export const fetchCharacterByName = async (name: string): Promise<ICharacters[]> => {
    const url = `${FetchHeroes}&nameStartsWith=${name}`;
    const res = await axios.get(url);
    return res.data.data.results;
};

export const getCharacter = async (url: RequestInfo | URL, urlAuthorization: string) => {
    const CharacterData = await axios.get(`${url}${urlAuthorization}`).then((res) => res.data.data.results);
    return CharacterData[0];
}

export const getComics = async (urlComic: string | undefined, urlAuthorization: string, page: number) => {
    if (urlComic) {
        const CharacterComicsResponse = await axios.get(`${urlComic}/comics${urlAuthorization}&offset=${page}`).then(res => res.data.data.results);
        comicsPages(CharacterComicsResponse);
        return CharacterComicsResponse;
    } else {
        return [];
    }
}

export const comicsPages = async (urlComic: IComic[]) => {
    if (urlComic) {
        return urlComic
    } else {
        return [];
    }
}


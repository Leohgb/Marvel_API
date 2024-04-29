import axios from "axios";
import { comicsPages } from "./useComicsPages";

export const getComics = async (urlComic: string | undefined, urlAuthorization: string, page: number) => {
    if (urlComic) {
        const CharacterComicsResponse = await axios.get(`${urlComic}/comics${urlAuthorization}&offset=${page}`).then(res => res.data.data.results);
        comicsPages(CharacterComicsResponse);
        return CharacterComicsResponse;
    } else {
        return [];
    }
}
import axios from "axios";


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


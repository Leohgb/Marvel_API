import { IComic } from "../app/pages";

export const comicsPages = async (urlComic: IComic[]) => { if (urlComic) { return urlComic } else { return []; } }
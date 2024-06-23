import { FetchHeroes } from "./Util";
import { ICharacters } from "../Domain/Entities/characters.entity";
import axios from "axios";

export const fetchRandomCharacter = async (): Promise<ICharacters[]> => {
    const url = `${FetchHeroes}&offset=${Math.floor(Math.random() * (1543 - 0 + 1)) + 0}`;
    try {
        const res = await axios.get(url);
        return res.data.data.results;
    } catch (e: any) {
        return e;
    }
};


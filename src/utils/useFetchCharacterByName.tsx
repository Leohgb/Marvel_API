import axios from "axios";
import { FetchHeroes } from "./Util";
import { ICharacters } from "../Domain/Entities/characters.entity";

export const fetchCharacterByName = async (name: string): Promise<ICharacters[]> => {
    if (name != "") {
        const url = `${FetchHeroes}&nameStartsWith=${name}`;
        const res = await axios.get(url)
        return res.data.data.results;
    } else {
        return [];
    }
};

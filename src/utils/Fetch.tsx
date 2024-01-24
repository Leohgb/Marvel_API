// useCases/FetchHeroesUseCase.ts
import axios from "axios";
import { FetchHeroes } from "./Util";
import { useState } from "react";

const [url, setUrl] = useState(FetchHeroes);

export const fetchRandomCharacter = async (): Promise<ICharacters> => {
    const random = Math.floor(Math.random() * (1543 - 0 + 1)) + 0;
    const res = await axios.get(`${FetchHeroes}&offset=${random}`);
    return res.data.data.results[0];
};

export const fetchCharacterByName = async (name: string): Promise<ICharacters[]> => {
    const res = await axios.get(`${FetchHeroes}&nameStartsWith=${name}`);
    return res.data.data.results;
};

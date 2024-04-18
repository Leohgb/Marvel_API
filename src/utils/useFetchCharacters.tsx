import axios from "axios";

export const fetchCharacters = async (url: RequestInfo | URL, urlAuthorization: string) => {
    const CharacterData = await axios.get(`${url}${urlAuthorization}`).then((res) => res.data.data.results);
    return CharacterData[0];
}
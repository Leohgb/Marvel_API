import { useParams } from "react-router-dom";
import './Character.css'
import { useEffect, useState } from "react";
import { FetchHeroes } from "../../../utils/Util";
import axios from "axios";
import Card from "../../shared/components/Card";

export const Character = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState<ICharacters>()
    const [comics, setComics] = useState<IComic[]>([]);
    const [url, setUrl] = useState(FetchHeroes);

    const getCharacter = async (url: RequestInfo | URL, urlAuthorization: String) => {
        const CharacterData = await axios.get(`${url}${urlAuthorization}`).then((res) => res.data.data.results);
        setCharacter(CharacterData[0]);
        try {
            const CharacterComicsResponse = await axios.get(`${CharacterData[0].comics.collectionURI}${urlAuthorization}`);
            setComics(CharacterComicsResponse.data.data.results);

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log(comics)
        setUrl(FetchHeroes);
        const urlAuthorization = `${url?.slice(51)}`;
        const characterUrl = `${url?.slice(0, 51)}/${id}`;
        getCharacter(characterUrl, urlAuthorization);
    }, [])

    return (
        <div className="container ">
            {character && <>
                <p className="tagline">{ }</p>
                <div className="info">
                    <div className="character-image">
                        <figure>
                            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="" />
                        </figure>
                    </div>
                    <div className="character-info">
                        <h1>{character.name}</h1>
                        {character.description === "" && <h3>Não possui descrição</h3> || <h3> {character.description}</h3>}
                    </div>
                </div>
                <div className="">
                    <h2>
                        Quadrinhos:
                    </h2>
                    <div className="card-container HQ">
                        {comics.map((comic) => (
                            <Card key={comic.id} data={comic} showLink={true} />
                        ))}

                    </div>
                </div>

            </>
            }
        </div>
    )

}
import { useParams } from "react-router-dom";
import './Character.css'
import { useEffect, useState } from "react";
import { FetchHeroes } from "../../../utils/Util";
import Card from "../../shared/components/Card";
import { fetchData, getComics } from "../../../utils/asyncActions";
import Pagination from "../../shared/components/Pagination";

export const Character = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState<ICharacters>()
    const [comics, setComics] = useState<IComic[]>([]);
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(FetchHeroes);
    const urlAuthorization = `${url?.slice(51)}`;
    const characterUrl = `${url?.slice(0, 51)}/${id}`;

    useEffect(() => {
        setUrl(FetchHeroes);
        fetchData(characterUrl, urlAuthorization).then((character) => setCharacter(character));
        getComics(characterUrl, urlAuthorization, page).then(comics => setComics(comics));
    }, [page])

    return (
        <div className="container ">

            {character && <>
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
                <div>
                    <h1>
                        Quadrinhos:
                    </h1>
                    <div className="card-container Hq">
                        {comics.map((comic) => (
                            <Card key={comic.id} data={comic} showLink={true} />
                        ))}
                    </div>
                    <Pagination page={page} setPage={setPage} available={character?.comics?.available} />
                </div>

            </>
            }
        </div>
    )
}

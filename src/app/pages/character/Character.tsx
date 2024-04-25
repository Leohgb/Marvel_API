import { useParams } from "react-router-dom";
import { fetchData } from "../../../utils/useFetchData";
import './Character.css'
import { useCallback, useEffect, useRef, useState } from "react";
import { FetchHeroes } from "../../../utils/Util";
import Card from "../../shared/components/card/Card";
import { getComics } from "../../../utils/asyncActions";
import Pagination from "../../shared/components/pagination/Pagination";
import notFound from "../../../assets/Marvel_logo2.png"
import { ICharacters } from "../../../Domain/Entities/characters.entity";
import { getTimeoutId } from "../../../utils/timeout/Timeout";

export const Character = () => {
    const wasCalled = useRef(false);

    const { id } = useParams()
    const [character, setCharacter] = useState<ICharacters>()
    const [comics, setComics] = useState<IComic[]>([]);
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(FetchHeroes);
    const [showMessage, setShowMessage] = useState<boolean>(false);

    const urlAuthorization = `${url?.slice(51)}`;
    const characterUrl = `${url?.slice(0, 51)}/${id}`;


    const Characters = useCallback(() => {
        setUrl(FetchHeroes);
        fetchData(characterUrl, urlAuthorization).then((character) => {
            if (wasCalled.current) return;
            wasCalled.current = true;
            return setCharacter(character)
        });

        const resultPromise = getTimeoutId(true);
        resultPromise.then((res) => setShowMessage(res));

        getComics(characterUrl, urlAuthorization, page).then(comics => setComics(comics));
    }, [character, characterUrl, page, urlAuthorization])

    useEffect(() => {
        Characters()
    }, [Characters])

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
                        {character.description === "" && <img src={notFound} alt="" /> || <h3> {character.description}</h3>}
                    </div>
                </div>
                <div>
                    <h1>
                        Appearances:
                    </h1>
                    <div className="card-container Hq">
                        {comics.length === 0 && <img className="NotFound" src={notFound} />}

                        {showMessage == false && <img className="NotFound" src={notFound} />}
                        {comics.length > 0 && showMessage && comics.map((comic) => (
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

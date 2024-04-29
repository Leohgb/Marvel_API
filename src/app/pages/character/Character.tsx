import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './Character.css'
import { fetchData } from "../../../utils/useFetchData";
import { FetchHeroes } from "../../../utils/Util";
import { getComics } from "../../../utils/useFetchComics";
import { ICharacters } from "../../../Domain/Entities/characters.entity";
import { getTimeoutId } from "../../../utils/timeout/Timeout";
import Card from "../../shared/components/card/Card";
import Pagination from "../../shared/components/pagination/Pagination";

import Thanos_Snap from "../../../assets/snap-the-snap.gif";
import Error_Code from "../../../assets/Marvel_logo2.png";

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
        console.log(character);
        getComics(characterUrl, urlAuthorization, page).then(comics => setComics(comics));
        
        const resultPromise = getTimeoutId(true);
        resultPromise.then((res) => setShowMessage(res));

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
                        {character.description === "" && <img src={Error_Code} alt="" /> || <h3> {character.description}</h3>}
                    </div>
                </div>
                <div>
                    <h1>
                        Appearances:
                    </h1>
                    <div className="card-container Hq">
                        {comics.length === 0 && showMessage == false && <img className="Thanos-Gif" src={Thanos_Snap} />}
                        {comics.length === 0 && showMessage && <img className="NotFound" src={Error_Code} />}
                        {comics.length > 0 && comics.map((comic) => (
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

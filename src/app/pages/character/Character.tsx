import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './Character.css'

import * as AllExports from "../index";
import { Loading } from "../loading/loading";

export const Character = () => {
    const wasCalled = useRef(false);

    const { id } = useParams()
    const [character, setCharacter] = useState<AllExports.ICharacters>()
    const [comics, setComics] = useState<AllExports.IComic[]>([]);
    const [page, setPage] = useState(0);
    const [url, setUrl] = useState(AllExports.FetchHeroes);
    const [showMessage, setShowMessage] = useState<boolean>(false);

    const urlAuthorization = `${url?.slice(51)}`;
    const characterUrl = `${url?.slice(0, 51)}/${id}`;


    const Characters = useCallback(() => {
        setUrl(AllExports.FetchHeroes);
        AllExports.fetchData(characterUrl, urlAuthorization).then((character) => {
            if (wasCalled.current) return;
            wasCalled.current = true;
            return setCharacter(character)
        });
        AllExports.getComics(characterUrl, urlAuthorization, page).then(comics => setComics(comics));

        const resultPromise = AllExports.getTimeoutId(true);
        resultPromise.then((res) => setShowMessage(res));

    }, [characterUrl, page, urlAuthorization])

    useEffect(() => {
        Characters()
    }, [Characters])

    return (
        <div className="container character">

            {character && <>
                <div className="info">
                    <div className="character-image">
                        <figure>
                            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="" />
                        </figure>
                    </div>
                    <div className="character-info">
                        <h1>{character.name}</h1>
                        {character.description === "" && <img src={AllExports.Error_Code} alt="" /> || <h3> {character.description}</h3>}
                    </div>
                </div>
                <div>
                    <h1>
                        Appearances:
                    </h1>
                    <div className="card-container Hq">
                        {comics.length === 0 && showMessage == false && <Loading />}
                        {comics.length === 0 && showMessage && <img className="NotFound" src={AllExports.Error_Code} />}
                        {comics.length > 0 && comics.map((comic) => (
                            <AllExports.Card key={comic.id} data={comic} showLink={true} />
                        ))}
                    </div>
                    <AllExports.Pagination page={page} setPage={setPage} available={character?.comics?.available} />
                </div>
            </>
            }
        </div>
    )
}

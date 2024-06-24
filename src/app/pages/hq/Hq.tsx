import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as AllExports from "../index";
import "./Hq.css";
import { Loading } from "../loading/loading";

export const Hq = () => {
    const { id } = useParams();
    const [hq, setHq] = useState<AllExports.IHq>();
    const [url, setUrl] = useState(AllExports.FetchHeroes);
    const [characters, setCharacters] = useState<AllExports.ICharacters[]>([]);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const wasCalled = useRef(false);

    const urlAuthorization = `${url?.slice(51)}`;
    const UrlCorrect = url.startsWith(" ") ? url : url.replace('http:', 'https:');
    const hqUrl = `${UrlCorrect?.slice(0, 41)}comics/${id}`;

    useEffect(() => {
        setUrl(AllExports.FetchHeroes);

        AllExports.fetchData(hqUrl, urlAuthorization).then((hq) => {
            if (wasCalled.current) return;
            wasCalled.current = true;
            setHq(hq);
        });
        if (hq) {
            AllExports.fetchCharacter(`${hq?.characters.collectionURI}`, urlAuthorization)
                .then((character) => setCharacters(character));
        }

        const resultPromise = AllExports.getTimeoutId(true);
        resultPromise.then((res) => setShowMessage(res));

    }, [hq, hqUrl, urlAuthorization]);


    return (
        <main className="Comic">
            {hq &&
                <div>
                    <h2 className="Title">{hq.title}</h2>
                    <div className="Informations">
                        <figure className="picture">
                            <img src={`${hq.thumbnail.path}.${hq.thumbnail.extension}`} alt="" />
                            <h2>Launch: {new Date(hq.dates[0].date).toLocaleDateString()}</h2>
                        </figure>
                        <div className="description">
                            <h2>Creators:</h2>
                            {hq.creators ?
                                hq.creators.items.map((creator, index) => (
                                    <h3 key={index}>{creator.role === 'writer' ? `✍️${creator.role}` :
                                        creator.role === 'artist' || creator.role === 'colorist (cover)'
                                            || creator.role === 'colorist' || creator.role === 'painter (cover)' ? `🖌${creator.role}`
                                            : creator.role === 'penciler (cover)' || creator.role === 'letterer'
                                                || creator.role === 'penciler' || creator.role === 'penciller'
                                                || creator.role === 'penciller (cover)' ? `📝${creator.role}`
                                                : creator.role === 'editor' ? `📄${creator.role}`
                                                    : creator.role === 'inker' || creator.role === 'inker (cover)' ? `🎨${creator.role}`
                                                        : creator.role}: {creator.name}</h3>
                                )) : <img src={AllExports.Error_Code} />}
                            <h2>Story:</h2>
                            <p>{hq.description ? hq.description : <img src={AllExports.Error_Code} />}</p>
                        </div>

                    </div>
                    <div className="card-container hq">
                        {characters.length === 0 && showMessage == false && <Loading />}
                        {characters.length === 0 && showMessage && <img className="NotFound" src={AllExports.Error_Code} />}
                        {characters.length > 0 && characters.map((character) =>
                            <AllExports.Card key={character.id} data={character} showLink={true}></AllExports.Card>
                        )}
                    </div>
                </div> ||
                <div></div>
            }
        </main>
    )
}

export default Hq;
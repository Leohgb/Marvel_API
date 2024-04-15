import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchHeroes } from "../../../utils/Util";
import { fetchCharacter, fetchData } from "../../../utils/asyncActions";
import notFound from "../../../assets/Marvel_logo2.png"
import "./Hq.css";
import { ICharacters } from "../../../Domain/Entities/characters.entity";
import { IHq } from "../../../Domain/Entities/hq.entity";
import Card from "../../shared/components/card/Card";

export const Hq = () => {
    const wasCalled = useRef(false);

    const { id } = useParams()
    const [hq, setHq] = useState<IHq>()
    const [url, setUrl] = useState(FetchHeroes);
    const [characters, setCharacters] = useState<ICharacters[]>([]);

    const urlAuthorization = `${url?.slice(51)}`;
    const hqUrl = `${url?.slice(0, 41)}comics/${id}`;

    useEffect(() => {

        console.log(hq?.id)
        setUrl(FetchHeroes);
        fetchData(hqUrl, urlAuthorization).then((hq) => {
            if (wasCalled.current) return;
            wasCalled.current = true;
            setHq(hq)
        });
        hq && fetchCharacter(`${hq?.characters.collectionURI}`, urlAuthorization)
            .then((character) => setCharacters(character));
    }, [hq, hqUrl, urlAuthorization])

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
                                )) : <img src={notFound} />}
                            <h2>Story:</h2>
                            <p>{hq.description ? hq.description : <img src={notFound} />}</p>
                        </div>

                    </div>
                    <div className="card-container hq">
                        {characters.map((character) =>
                            <Card key={character.id} data={character} showLink={true}></Card>
                        )}
                    </div>
                </div>
                || <div>

                </div>}
        </main>
    )
}

export default Hq;
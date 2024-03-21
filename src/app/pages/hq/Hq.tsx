import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchHeroes } from "../../../utils/Util";
import { fetchCharacter, fetchData } from "../../../utils/asyncActions";
import notFound from "../../../assets/NAO_Encontrado.png"
import "./Hq.css";
import { ICharacters } from "../../../Domain/Entities/characters.entity";
import { IHq } from "../../../Domain/Entities/hq.entity";

export const Hq = () => {
    const { id } = useParams()
    const [hq, setHq] = useState<IHq>()
    const [url, setUrl] = useState(FetchHeroes);
    const [character, setCharacter] = useState<ICharacters[]>([]);

    const urlAuthorization = `${url?.slice(51)}`;
    const hqUrl = `${url?.slice(0, 41)}comics/${id}`;

    useEffect(() => {
        setUrl(FetchHeroes);
        fetchData(hqUrl, urlAuthorization).then((hq) => { setHq(hq) });
        hq && fetchData(`${hq?.characters.collectionURI}`, urlAuthorization)
            .then((character) => setCharacter(character));
    }, [hq?.characters.collectionURI, hqUrl, urlAuthorization])

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
                        <div key={hq.id} className="description">
                            <h2>Creators:</h2>
                            {hq.creators ?
                                hq.creators.items.map((creator) => (
                                    <h3>{creator.role === 'writer' ? `✍️${creator.role}` :
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
                        <p>{/*hq && character.map((chara)=> chara.name)*/}</p>

                    </div>
                    <div>
                    </div>
                </div>
                || <div>

                </div>}
        </main>
    )
}

export default Hq;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchHeroes } from "../../../utils/Util";
import { fetchData } from "../../../utils/asyncActions";
import "./Hq.css";
export const Hq = () => {
    const { id } = useParams()
    const [hq, setHq] = useState<IHq>()
    const [url, setUrl] = useState(FetchHeroes);
    const urlAuthorization = `${url?.slice(51)}`;
    const hqUrl = `${url?.slice(0, 41)}comics/${id}`;

    useEffect(() => {
        setUrl(FetchHeroes);
        fetchData(hqUrl, urlAuthorization).then((hq) => { setHq(hq) });
        console.log(hq)
    }, [])

    return (
        <main className="Comic">
            {hq &&
                <div>
                    <h2>{hq.title}</h2>
                    <div className="Informations">
                        <figure className="picture">
                            <img src={`${hq.thumbnail.path}.${hq.thumbnail.extension}`} alt="" />
                            <p>{hq.dates[0].date}</p>
                        </figure>
                        <div className="description">
                            <h2>criadores:</h2>
                            {hq.creators.items.map((creator) => (
                                 <h3> {creator.role}: {creator.name}</h3>
                            ))}
                            <h2>Historia:</h2>
                            <p>{hq.description}</p>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}

export default Hq;
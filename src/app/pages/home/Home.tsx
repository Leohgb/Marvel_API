import { ChangeEvent, useEffect, useRef, useState } from "react"
import Card from "../../shared/components/Card";
import '../home/Card.css'
import axios from "axios";
import { FetchHeroes } from "../../../utils/Util";

export const Dashboard = ({ search }: { search: any }) => {

    const shouldLog = useRef(true);

    const [characters, setCharacters] = useState<any[]>([]);

    const [url, setUrl] = useState(FetchHeroes);


    const getCharacter = async () => {
        setUrl(FetchHeroes);
        let hasMoreResults = true;
        let offset = 0;
        let allCharacters: any[] = [];

        while (hasMoreResults) {
            const res = await axios.get(`${url}&limit=100&offset=${offset}`)
                .then((res) => res.data.data.results);
            allCharacters = [...allCharacters, ...res];
            setCharacters(allCharacters);
            offset += 100;
            hasMoreResults = offset <= allCharacters.length
        }

    }

    /*
    const handleScroll = (e: any | Event) => {

        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {

            getCharacter();
        }

    }*/

    useEffect(() => {

        try {
            getCharacter();
        } catch (e) {
            console.log(e)
        }
        // window.addEventListener("scroll", handleScroll);
    }, [search]);

    return (
        < div className="container" >
            <h2 className="title">Personagens:</h2>
            <div className="card-container">
                {characters.length === 0 && <p>Carregando...</p>}
                {!search.slice(-1) && characters.length > 0 &&
                    characters.map((character) =>
                        <Card key={character.id} character={character} showLink={true} />)}
                {/*search.slice(-1) && characters.length > 0 &&
                    search.map((character: any) =>
                <Card key={character.id} character={character} showLink={true} />)*/}
            </div>
        </div>
    )

}
import { useEffect, useState } from "react"
import Card from "../../shared/components/Card";
import '../home/Home.css'
import Die from "../../../assets/die.png";
import { useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Thanos_Snap from "../../../assets/snap-the-snap.gif"
import { fetchCharacterByName, fetchRandomCharacter } from "../../../utils/asyncActions";
import { ICharacters } from "../../../Domain/Entities/characters.entity";

export const Dashboard = () => {
    const [characters, setCharacters] = useState<ICharacters[]>([]);
    const [search, setSearch] = useState<string>("");
    const [click, setClick] = useState<boolean>(false);
    const input = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setClick(true);
        try {
            setSearch(input.current?.value || "");
        } catch (e) {
            console.log(e)
        }
    }

    /*const getRandomCharacter = async () => {
        setSearch("");
        if (search == "") {
            setCharacters([]);
        }
        const random = Math.floor(Math.random() * (1543 - 0 + 1)) + 0;
        setRandom(random);
        const res = await axios.get(`${url}&offset=${random}`);
        setTimeout(() => setCharacters(res.data.data.results), 2500);
    };

    const getCharacter = async () => {
        setUrl(FetchHeroes);
        //&offset=1562
        if (search != "") {
            setCharacters([]);
            const res = await axios.get(`${url}&nameStartsWith=${search} `)
                .then((res) => res.data.data.results);
            setTimeout(() => setCharacters(res), 2500);
        }
    }*/

    useEffect(() => {
        if (click === false) {
            setCharacters([]);
            fetchRandomCharacter().then(characters => setTimeout(() => setCharacters(characters), 2300));
        } else if (click === true) {
            setCharacters([]);
            setSearch("");
            fetchCharacterByName(search).then(character => setTimeout(() => setCharacters(character), 2300));
        }
    }, [click, search]);

    return (
        < div className="container" >
            <form className="search">
                <input type="text"
                    placeholder="Search for a Character"
                    ref={input}
                />
                <button onClick={handleSubmit}> <BiSearchAlt2 /></button>
            </form>
            <h2 className="title">Characters:</h2>
            <button className="random-button" onClick={() => {
                fetchRandomCharacter().then(characters => setCharacters(characters))
                setClick(true);
            }}>
                <img className="random-die" src={Die} alt="Dado" />
            </button>
            <div className="card-container">
                {characters.length === 0 && <img className="Thanos-Gif" src={Thanos_Snap} />}
                {characters.length !== 0 &&
                    characters.map((character) =>
                        <Card key={character.id} data={character} showLink={true} />)}

            </div>
        </div>
    )

}
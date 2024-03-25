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
    const [initialized, setInitialized] = useState(false);

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

    const characterSet = (characters: ICharacters[]) => {
        setCharacters(characters)
    }

    useEffect(() => {
        setTimeout(() => {
            if (click === false) {
                setCharacters([]);
                fetchRandomCharacter().then((character) => characterSet(character));
            } else if (click === true) {
                setCharacters([]);
                setSearch("");
                fetchCharacterByName(search).then((character) => { characterSet(character) });
            }
            setInitialized(true);
        }, 1000)
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
                {characters.length !== 0 && initialized == true &&
                    characters.map((character) =>
                        <Card key={character.id} data={character} showLink={true} />)}

            </div>
        </div>
    )

}
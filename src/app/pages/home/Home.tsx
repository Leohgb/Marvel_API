import { useEffect, useState } from "react"
import Card from "../../shared/components/Card";
import '../home/Home.css'
import Die from "../../../assets/die.png";
import { useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Thanos_Snap from "../../../assets/snap-the-snap.gif"
import Error_Code from "../../../assets/Marvel_logo2.png"
import { fetchCharacterByName, fetchRandomCharacter } from "../../../utils/asyncActions";
import { ICharacters } from "../../../Domain/Entities/characters.entity";

export const Dashboard = () => {
    const [characters, setCharacters] = useState<ICharacters[]>([]);
    const [showMessage, setShowMessage] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");
    const [click, setClick] = useState<boolean>(false);
    const wasCalled = useRef(false);

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

    useEffect(() => {
        if (click === false) {
            if (wasCalled.current) return;
            wasCalled.current = true;
            fetchRandomCharacter().then((character) => setCharacters(character));
        } else if (click === true) {
            setSearch("");
            setShowMessage(false);
            fetchCharacterByName(search).then((character) => { return setCharacters(character) });
        }
        const timeoutId = setTimeout(() => {
            setShowMessage(true)
        }, 2000);

        return () => clearTimeout(timeoutId);

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
            <div className="buttons">
                <button className="random-button" onClick={() => {
                    fetchRandomCharacter().then(characters => setCharacters(characters))
                    setClick(true);
                }}>
                    <img className="random-die" src={Die} alt="Dado" />
                </button>
                <div className="dropdown">
                    <button className="dropbtn">?</button>
                    <p className="dropdown-content">AAAAAA</p>
                </div>
            </div>
            <div className="card-container">
                {characters.length === 0 && showMessage == false && <img className="Thanos-Gif" src={Thanos_Snap} />}
                {characters.length === 0 && showMessage && <img className="NotFound" src={Error_Code} />}
                {characters.length !== 0 &&
                    characters.map((character) =>
                        <Card key={character.id} data={character} showLink={true} />)}

            </div>
        </div>
    )

}
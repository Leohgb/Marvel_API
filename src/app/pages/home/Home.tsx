import { useEffect, useState, useRef } from "react"
import '../home/Home.css'
import { BiSearchAlt2 } from "react-icons/bi";
import * as AllExports from "../index";
import { Loading } from "../loading/loading";

export const Dashboard = () => {
    const wasCalled = useRef(false);
    const [characters, setCharacters] = useState<AllExports.ICharacters[]>([]);
    const [showMessage, setShowMessage] = useState<boolean>(false);

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

    useEffect(() => {
        if (click === false) {
            if (wasCalled.current) return;
            wasCalled.current = true;
            AllExports.fetchRandomCharacter().then((character) => setCharacters(character));
        } else if (click === true) {
            setSearch("");
            setShowMessage(false);
            AllExports.fetchCharacterByName(search).then((character) => setCharacters(character));
        }
        const resultPromise = AllExports.getTimeoutId(true);
        resultPromise.then((res) => setShowMessage(res));
    }, [click, search]);

    return (
        < div className="container" >
            <div className="buttons">
                <form className="search">
                    <input type="text"
                        placeholder="Search for a Character"
                        ref={input}
                    />
                    <button onClick={handleSubmit}> <BiSearchAlt2 /></button>
                </form>
                <div className="dropdown">
                    <button className="dropbtn">?</button>
                    <p className="dropdown-content">Para encontrar o personagem que deseja digite o nome em inglês, por exemplo ao invés de "Homem aranha" digite "Spider-man".</p>
                </div>
            </div>

            <h2 className="title">Characters:</h2>
            <button className="random-button" onClick={() => {
                AllExports.fetchRandomCharacter().then(characters => setCharacters(characters))
                setClick(true);
            }}>
                <img className="random-die" src={AllExports.Die} alt="Dado" />
            </button>

            <div className="card-container">
                {characters.length === 0 && showMessage == false && <Loading />}
                {characters.length === 0 && showMessage && <img className="NotFound" src={AllExports.Error_Code} />}
                {characters.length !== 0 &&
                    characters.map((character) =>
                        <AllExports.Card key={character.id} data={character} showLink={true} />)
                }
            </div>
        </div>
    )

}
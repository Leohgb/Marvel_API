
import { BiSearchAlt2 } from "react-icons/bi"
import './Navbar.css'

/*import axios from "axios"

import { FetchHeroes } from "../../../utils/Util";

import { useCallback, useEffect, useState } from "react";
*/

const Navbar = ({ setSearch }: { setSearch: any }) => {
setSearch("")
/*

  const [url, setUrl] = useState(FetchHeroes);

  const [offset, setOffset] = useState(0);

  const [searched, setSearched] = useState("");

 

  const handleChange = useCallback((searched: string) => {

    setUrl(FetchHeroes);

    console.log(searched)

 

    try {

      axios.get(`${url}&nameStartsWith=${searched}&limit=12&offset=${offset}`)

        .then((res) => {

          const newCharacters: object[] = [];

          res.data.data.results.forEach((p: object) => newCharacters.push(p))

          setSearch((oldCharacters: any) => [...oldCharacters, ...newCharacters]);

        });

 

    } catch (e) {

      console.log(e)

      setSearch("")

    }

  }, [offset, setSearch, url])

 

  const handleInfiniteScroll = (e: any) => {

    try {

      if (window.innerHeight + e.target.documentElement.scrollTop + 1 >=

        e.target.documentElement.scrollHeight) {

        setOffset((prev) => prev + 12);

      }

    } catch (error) {

      console.log(error);

    }

  };

 

  useEffect(() => {

    handleChange(searched);

    window.addEventListener("scroll", handleInfiniteScroll);

    return () => window.removeEventListener("scroll", handleInfiniteScroll);

  }, [handleChange, offset, searched]);

*/

 

  return (

    <div>

      <nav id="navbar">

        <h2>

 

        </h2>

        <input type="text"

          placeholder="Busque um Personagem"

          onChange={(e) => console.log(e.target.value)}

        />

        <button type="submit"> <BiSearchAlt2 /></button>

      </nav>

 

    </div>

  )

}

 

export default Navbar

 
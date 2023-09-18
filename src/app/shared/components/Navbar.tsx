
import { BiSearchAlt2 } from "react-icons/bi"
import './Navbar.css'

const Navbar = ({ setSearch }: { setSearch: any }) => {

  const handleChange = (searched: string) => {
    try {
      setSearch(searched);
    } catch (e) {
      console.log(e)
      setSearch("")
    }
  }

  return (

    <div>
      <nav id="navbar">
        <h2>
        </h2>
        <input type="text"
          placeholder="Busque um Personagem"
          onChange={(e) => handleChange(e.target.value)}
        />
        <button type="submit"> <BiSearchAlt2 /></button>
      </nav>
    </div>

  )

}



export default Navbar


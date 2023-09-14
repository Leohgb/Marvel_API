import { Link } from 'react-router-dom'

const Card = ({ character, showLink = true }: { character: any, showLink: boolean }) => {
    return (
        <div className="card-card">
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
            <h2>{character.name}</h2>
            <p>
            </p>
            {showLink && <Link to={`/movie/${character.id}`}>Detalhes</Link>}
        </div>
    )
}



export default Card
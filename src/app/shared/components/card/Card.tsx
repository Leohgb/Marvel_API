import { Link } from 'react-router-dom';
import './Card.css'
import { ICharacters } from '../../../../Domain/Entities/characters.entity';

interface CardProps<T extends ICharacters | IComic> {
    data: T;
    showLink?: boolean;
}

const Card = <T extends ICharacters | IComic>({ data }: CardProps<T>) => {
    return (
        <div className="card-card">
            {('name' in data) &&
                <Link to={`/character/${data.id}`}>
                    <div className='card-items'>
                        <img className="imagem" src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={`${data.name}`} />
                        <h2>{data.name !== "" && data.name}</h2>
                    </div>
                    <div className='Card-Details'><h2>Detalhes</h2></div>
                </Link>
                || ('title' in data) &&
                <Link to={`/Hq/${data.id}`}>
                    <div className='card-items'>
                        <img className="imagem" src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={`${data.title}`} />
                        <h2>{data.title !== "" && data.title}</h2>
                    </div>
                    <div className='Card-Details'><h2>Detalhes</h2></div>
                </Link>
            }
        </div>
    );
};

export default Card;




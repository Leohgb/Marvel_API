import { Link } from 'react-router-dom';
import { ICharacters, IComic } from '../index';
import './Card.css';

interface CardProps<T extends ICharacters | IComic> {
    data: T;
    showLink?: boolean;
}

const Card = <T extends ICharacters | IComic>({ data }: CardProps<T>) => {

    const truncate = (input: string) =>
        input.length >= 50 ? `${input.substring(0, 50)}...` : input;

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
                        <h2>{data.title !== "" && data.title ? truncate(data.title) : data.title}</h2>
                    </div>
                    <div className='Card-Details'><h2>Detalhes</h2></div>
                </Link>
            }
        </div>
    );
};

export default Card;




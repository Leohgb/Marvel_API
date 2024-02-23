import { Link } from 'react-router-dom';

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
                    <div className='Card-Details'>Detalhes</div>
                </Link>
                || ('title' in data) &&
                <div className='card-items'>
                    <img className="imagem" src={`${data.thumbnail.path}.${data.thumbnail.extension}`} alt={`${data.title}`} />
                    <h2>{data.title !== "" && data.title}</h2>
                </div>
            }
        </div>
    );
};

export default Card;




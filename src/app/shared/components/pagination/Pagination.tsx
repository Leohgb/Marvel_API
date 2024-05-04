import './Pagination.css';

const Pagination = ({ page, setPage, available }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, available: number | undefined }) => {
    const pageNumbers = [];
    const renderizarIntervalo = [false, false];
    const pageFormat = page / 20;

    if (available) {
        for (let i = 0; i < available; i += 20) {
            if (page >= 0) {
                pageNumbers.push(i);
            }
        }
    }

    return (
        <div className='Pagination'>
            <ul className='List'>
                {page > pageNumbers[0] && <button onClick={() => setPage(prevState => prevState - 20)}>&#60;</button>}
                {pageNumbers.map((num, index) => {
                    if (
                        index + 1 === pageNumbers.length ||
                        index + 1 === 1 ||
                        index === pageFormat ||
                        index === (pageFormat) + 1 ||
                        index === (pageFormat) - 1 ||
                        pageNumbers.length <= 20
                    ) {
                        return (
                            <li key={index}>
                                <button onClick={() => setPage(num)}>{index + 1}</button>
                            </li>
                        );
                    } else if (pageNumbers.length >= 15 && index - 1 >= (pageFormat) + 1 && !renderizarIntervalo[0]) {
                        renderizarIntervalo[0] = true;
                        return (
                            <li key={index}>
                                <button>....</button>
                            </li>
                        );
                    } else if (pageNumbers.length >= 20 && index - 1 <= (pageFormat) + 1 && !renderizarIntervalo[1]) {
                        renderizarIntervalo[1] = true;
                        return (
                            <li key={index}>
                                <button>....</button>
                            </li>
                        );
                    }
                    return null;
                })}
                {pageFormat <= pageNumbers.length - 2 && <button onClick={() => setPage(prevState => prevState + 20)}>&#62;</button>}
            </ul>
        </div >
    )
}

export default Pagination;

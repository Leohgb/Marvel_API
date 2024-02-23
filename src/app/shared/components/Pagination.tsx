import './Pagination.css'

const Pagination = ({ page, setPage, available }: { page: number, setPage: Function, available: number | undefined }) => {
    const pageNumbers = [];
    let renderizarIntervalo = [false, false];

    if (available) {
        for (let i = 0; i < available; i += 20) {
            if (page >= 0) {
                pageNumbers.push(i);
            }
        }
    }

    return (
        <div className='Pagination'>
            {page > pageNumbers[0] && <button onClick={() => { setPage((prevState: number) => (prevState - 20)) }}>&#60;</button> || <p></p>}
            <ul className='List'>
                {pageNumbers.map((num, index) => {
                    let pageFormat = page / 20;
                    if (
                        index + 1 === pageNumbers.length ||
                        index + 1 === 1 ||
                        index === pageFormat ||
                        index === (pageFormat) + 1 ||
                        index === (pageFormat) - 1
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
                })}
            </ul>
            <button onClick={() => setPage((prevState: number) => (prevState + 20))}>&#62;</button>
        </div >
    )
}

export default Pagination;

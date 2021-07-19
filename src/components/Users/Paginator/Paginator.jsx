import cn from 'classnames';
import React, { useState } from 'react';
import s from './Paginator.module.css';

const Paginator = ({ totalItemsCount, pageSize, currentPage, onChangePageNumber, portionSize = 10 }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = Array.apply(null, Array(pagesCount))   // создаём пустой массив нужной длины
        .map((val, idx) => idx + 1);                                            // заполняем его номерами страниц

    const portionsCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div>
            {
                portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>
            }
            {
                pages.filter(pageNumber => (
                    pageNumber >= leftPortionPageNumber && pageNumber <= rightPortionPageNumber
                )).map(pageNumber => {
                    return (
                        <span
                            key={pageNumber}
                            className={cn({ [s.selected]: pageNumber === currentPage }, s.pageNumber)}
                            onClick={() => onChangePageNumber(pageNumber)}
                        >{pageNumber}</span>
                    );
                })
            }
            {
                portionNumber < portionsCount &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
            }
        </div>
    );
};

export default Paginator;
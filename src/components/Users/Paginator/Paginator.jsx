import cn from 'classnames';
import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import s from './Paginator.module.css';

const Paginator = ({ totalItemsCount, pageSize, currentPage, onChangePageNumber, portionSize = 10 }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = Array.apply(null, Array(pagesCount))   // создаём пустой массив нужной длины
        .map((val, idx) => idx + 1);                     // заполняем его номерами страниц

    const portionsCount = Math.ceil(pagesCount / portionSize);
    const startPortionNumber = Math.ceil(currentPage / portionSize);
    const [portionNumber, setPortionNumber] = useState(startPortionNumber);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            {
                portionNumber > 1 &&
                <Button onClick={() => setPortionNumber(portionNumber - 1)}
                    className={cn(s.changePageBtn, 'uk-margin-medium-right')}>
                    <span className="uk-icon" uk-icon="icon: arrow-left; ratio: 1.5"></span>
                </Button>
            }
            {
                currentPage > 1 &&
                <Button onClick={() => onChangePageNumber(currentPage - 1)}
                    className={cn(s.changePageBtn, 'uk-margin-medium-right')}>
                    <span className="uk-icon" uk-icon="icon: chevron-left; ratio: 1.5"></span>
                </Button>
            }
            {
                pages.filter(pageNumber => (
                    pageNumber >= leftPortionPageNumber && pageNumber <= rightPortionPageNumber
                )).map(pageNumber => {
                    return (
                        <Button
                            key={pageNumber}
                            className={cn({ [s.selected]: pageNumber === currentPage }, s.pageNumber)}
                            onClick={() => onChangePageNumber(pageNumber)}
                            isInvert={true}
                        >{pageNumber}</Button>
                    );
                })
            }
            {
                currentPage < pagesCount &&
                <Button onClick={() => onChangePageNumber(currentPage + 1)}
                    className={cn(s.changePageBtn, 'uk-margin-medium-left')}>
                    <span className="uk-icon" uk-icon="icon: chevron-right; ratio: 1.5"></span>
                </Button>
            }
            {
                portionNumber < portionsCount &&
                <Button onClick={() => setPortionNumber(portionNumber + 1)}
                    className={cn(s.changePageBtn, 'uk-margin-medium-left')}>
                    <span className="uk-icon" uk-icon="icon: arrow-right; ratio: 1.5"></span>
                </Button>
            }
        </div>
    );
};

export default Paginator;
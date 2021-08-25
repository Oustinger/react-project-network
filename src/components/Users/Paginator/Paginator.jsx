import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import MyButton from '../../common/MyButton/MyButton';
import s from './Paginator.module.css';

const Paginator = ({ totalItemsCount, pageSize, currentPage, onChangePageNumber, portionSize = 10 }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = Array.apply(null, Array(pagesCount))   // создаём пустой массив нужной длины
        .map((val, idx) => idx + 1);                     // заполняем его номерами страниц

    const portionsCount = Math.ceil(pagesCount / portionSize);

    const startPortionNumber = Math.ceil(currentPage / portionSize);
    const [portionNumber, setPortionNumber] = useState(startPortionNumber);
    useEffect(() => {
        setPortionNumber(startPortionNumber);
        // eslint-disable-next-line
    }, [currentPage]);

    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            {
                portionNumber > 1 &&
                <MyButton onClick={() => setPortionNumber(portionNumber - 1)}
                    className={cn(s.changePageBtn, 'uk-margin-medium-right')}>
                    <span className="uk-icon" uk-icon="icon: arrow-left; ratio: 1.5"></span>
                </MyButton>
            }
            {
                currentPage > 1 &&
                <MyButton onClick={() => onChangePageNumber(currentPage - 1)}
                    className={cn(s.changePageBtn, 'uk-margin-medium-right')}>
                    <span className="uk-icon" uk-icon="icon: chevron-left; ratio: 1.5"></span>
                </MyButton>
            }
            {
                pages.filter(pageNumber => (
                    pageNumber >= leftPortionPageNumber && pageNumber <= rightPortionPageNumber
                )).map(pageNumber => {
                    return (
                        <MyButton
                            key={pageNumber}
                            className={cn({ [s.selected]: pageNumber === currentPage }, s.pageNumber)}
                            onClick={() => onChangePageNumber(pageNumber)}
                            isInvert={true}
                        >{pageNumber}</MyButton>
                    );
                })
            }
            {
                currentPage < pagesCount &&
                <MyButton onClick={() => onChangePageNumber(currentPage + 1)}
                    className={cn(s.changePageBtn, 'uk-margin-medium-left')}>
                    <span className="uk-icon" uk-icon="icon: chevron-right; ratio: 1.5"></span>
                </MyButton>
            }
            {
                portionNumber < portionsCount &&
                <MyButton onClick={() => setPortionNumber(portionNumber + 1)}
                    className={cn(s.changePageBtn, 'uk-margin-medium-left')}>
                    <span className="uk-icon" uk-icon="icon: arrow-right; ratio: 1.5"></span>
                </MyButton>
            }
        </div>
    );
};

export default Paginator;
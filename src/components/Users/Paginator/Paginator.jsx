import React from 'react';
import s from './Paginator.module.css';

const getPages = (totalUsersCount, pageSize) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    const pages = Array.apply(null, Array(pagesCount > 20 ? 20 : pagesCount))// создаём пустой массив нужной длины
        .map((val, idx) => idx + 1);                                         // заполняем его номерами страниц

    return pages;
};

const Paginator = ({ totalUsersCount, pageSize, currentPage, onChangePageNumber }) => {
    const pages = getPages(totalUsersCount, pageSize);
    
    return (
        <div>
            {
                pages.map(p => {
                    return (
                        <span
                            key={p}
                            className={`${s.pageNumber} ${p === currentPage ? s.selected : null}`}
                            onClick={() => onChangePageNumber(p)}
                        >{p}</span>
                    );
                })
            }
        </div>
    );
};

export default Paginator;
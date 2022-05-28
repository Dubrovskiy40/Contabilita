import React from 'react';
import style from './totalResult.module.css';

const TotalResult = ({ totalCount }) => {

    return (
        <div className={style.totalResult}>
            <h2 className={totalCount >= 35 ? `${style.title_win}` : ''}>
                {
                    totalCount <= 0
                        ? '¯\\_(ツ)_/¯'
                        : totalCount < 35
                            ? `${totalCount} ВКСП`
                            : `${totalCount} ВКСП 
                                готово...`
                }
            </h2>
        </div>
    );
};

export default TotalResult;

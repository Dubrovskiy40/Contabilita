import React from 'react';
import style from './managerCard.module.css';

const ManagerCard = ({ id, avatar, name, managerVKSP, top, left }) => {

    const divStyle = {
        top: {top},
        left: {left}
    };

    return (
        <div className={`draggable ${style.managerCard}`} title={`${name}: ${managerVKSP} ВКСП`} id={id} style={divStyle}>
                <img className={style.managerCard__img} src={avatar} alt={name}/>
                <input
                    className={style.managerCard__inp}
                    type="text"
                    value={managerVKSP}
                    readOnly={true}
                />
        </div>
    )
};

export default ManagerCard;

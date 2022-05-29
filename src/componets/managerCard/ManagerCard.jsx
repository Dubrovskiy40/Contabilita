import React from 'react';
import style from './managerCard.module.css';

const ManagerCard = ({ id, avatar, name, managerVKSP, top, left, auth }) => {

    return (
        <div className={`${auth ? 'draggable' : ''} ${style.managerCard}`} title={`${name}: ${managerVKSP} ВКСП`} id={id} style={{position: 'absolute', top: top, left: left}}>
                <img className={style.managerCard__img} src={avatar} alt={name}/>
                <input
                    className={style.managerCard__inp}
                    type="text"
                    value={managerVKSP}
                    readOnly={true}
                    disabled={true}
                />
        </div>
    )
};

export default ManagerCard;

import React from 'react'
import style from './sandwich.module.css';
import {useDispatch, useSelector} from "react-redux";
import ManagerCard from "../managerCard/ManagerCard";
import {updateManager} from "../../actions/managersAction";

const Sandwich = () => {
    const managers = useSelector((state) => state.managers);

    const totalCount = managers.reduce((acc, manager) => {
        return acc += Number(manager.managerVKSP);
    }, 0);
    const dispatch = useDispatch();

    // const infoCount = document.querySelector('.infoCount')
    // console.log(infoCount.offsetLeft())
    // console.log(infoCount.offsetTop())

    let isDragging = false;

    const handleMouseDown = (event) => {
        event.preventDefault();

        let pageBlock = event.target.closest('.sandwichBlock');
        let dragElement = event.target.closest('.draggable');
        let dropElement = event.target.closest('.droppable');
        let pageBlockLeft = pageBlock.getBoundingClientRect().left;
        let pageBlockTop = pageBlock.getBoundingClientRect().top;
        let infoElement = event.target.closest('.infoCount');

        if (!dragElement) return;

        dragElement.ondragstart = function() {
            return false;
        };

        let coords, shiftX, shiftY;

        startDrag(dragElement, event.clientX, event.clientY);

        function onMouseUp(event) {
            finishDrag();
        }

        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
        }

        function startDrag(element, clientX, clientY) {
            if(isDragging) {
                return;
            }

            isDragging = true;

            pageBlock.addEventListener('mousemove', onMouseMove);
            element.addEventListener('mouseup', onMouseUp);

            shiftX = clientX - element.getBoundingClientRect().left;
            shiftY = clientY - element.getBoundingClientRect().top;

            element.style.position = 'fixed';

            moveAt(clientX, clientY);
        }

        function finishDrag() {
            if(!isDragging) {
                return;
            }

            isDragging = false;

            // dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset + 'px';
            dragElement.style.top = dragElement.offsetTop - pageBlockTop + 'px';
            dragElement.style.right = parseInt(dragElement.style.right) + 'px';
            dragElement.style.bottom = parseInt(dragElement.style.bottom) + 'px';
            dragElement.style.left = dragElement.offsetLeft - pageBlockLeft + 'px';

            let dragElementID = dragElement.getAttribute('id');
            dispatch(updateManager({id: dragElementID, top: dragElement.offsetTop, left: dragElement.offsetLeft}))

            pageBlock.style.position = 'relative';
            dragElement.style.position = 'absolute';

            // infoElement.style.top = infoElement.offsetTop + 'px';
            // infoElement.style.left = infoElement.offsetLeft + 'px';

            pageBlock.removeEventListener('mousemove', onMouseMove);
            dragElement.removeEventListener('mouseup', onMouseUp);
        }

        function moveAt(clientX, clientY) {
            // вычисляем новые координаты (относительно окна)
            let newX = clientX - shiftX;
            let newY = clientY - shiftY;

            dragElement.style.left = newX + 'px';
            dragElement.style.top = newY + 'px';
        }
    }

    return (
        <div className={`sandwichBlock ${style.sandwich}`} onMouseDown={handleMouseDown}>
            <div className={style.sandwich__before}>
                {managers?.map(manager => {
                    return (
                        <ManagerCard
                            key={manager.id}
                            id={manager.id}
                            avatar={manager.avatar}
                            name={manager.nameManager}
                            managerVKSP={manager.managerVKSP}
                            top={manager.top}
                            left={manager.left}
                        />
                        )
                    }
                )}
            </div>
            <div className={`infoCount ${style.sandwich__count}`}>{totalCount <= 0 ? '¯\\_(ツ)_/¯' : `${totalCount} ВКСП`}</div>
            <div className={`droppable ${style.sandwich__after}`}></div>
        </div>
    )
};

export default Sandwich;

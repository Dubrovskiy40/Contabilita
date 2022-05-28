import React from 'react'
import style from './sandwich.module.css';
import {useDispatch, useSelector} from "react-redux";
import ManagerCard from "../managerCard/ManagerCard";
import {updateManager} from "../../actions/managersAction";
import TotalResult from "../totalResult/TotalResult";

const Sandwich = () => {
    const managers = useSelector((state) => state.managers);
    const auth = useSelector((state) => state.auth);
    const totalCount = managers.reduce((acc, manager) => {
        return acc += Number(manager.managerVKSP);
    }, 0).toFixed(2);
    const dispatch = useDispatch();

    let isDragging = false;

    const handleMouseDown = (event) => {

        event.preventDefault();

        let pageBlock = event.target.closest('.sandwichBlock');
        let dragElement = event.target.closest('.draggable');
        let pageBlockLeft = pageBlock.getBoundingClientRect().left;
        let pageBlockTop = pageBlock.getBoundingClientRect().top;

        if (!dragElement) return;

        dragElement.ondragstart = function () {
            return false;
        };

        let shiftX, shiftY;

        startDrag(dragElement, event.clientX, event.clientY);

        function onMouseUp(event) {
            finishDrag();
        }

        function onMouseMove(event) {
            moveAt(event.clientX, event.clientY);
        }

        function startDrag(element, clientX, clientY) {

            if (isDragging) {
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
            if (!isDragging) {
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

            dragElement.style.position = 'absolute';
            pageBlock.removeEventListener('mousemove', onMouseMove);
            dragElement.removeEventListener('mouseup', onMouseUp);
        }

        function moveAt(clientX, clientY) {
            // вычисляем новые координаты (относительно окна)
            let newX = clientX - shiftX;
            let newY = clientY - shiftY;

            // ограничим newX, newY размерами блока с картинкой
            if (newX < pageBlock.offsetLeft ) newX = pageBlock.offsetLeft;
            if (newY < pageBlock.offsetTop ) newY = pageBlock.offsetTop;

            if (newX > pageBlock.offsetLeft + pageBlock.offsetWidth - dragElement.offsetWidth) {
                newX = pageBlock.offsetLeft + pageBlock.offsetWidth - dragElement.offsetWidth;
            }
            if (newY > pageBlock.offsetTop + pageBlock.offsetHeight - dragElement.offsetHeight) {
                newY = pageBlock.offsetTop + pageBlock.offsetHeight - dragElement.offsetHeight;
            }

            dragElement.style.left = newX + 'px';
            dragElement.style.top = newY + 'px';
        }
    }

    return (
        <div className={`sandwichBlock ${style.sandwich}`} onMouseDown={auth ? handleMouseDown : null}>
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
            <TotalResult totalCount={totalCount} />
        </div>
    )
};

export default Sandwich;

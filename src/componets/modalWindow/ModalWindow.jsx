import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import style from './modalWindow.module.css';
import {useDispatch} from "react-redux";
import {addManager} from "../../actions/managersAction";

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalWindow = ({ openModalWindow, setOpenModalWindow }) => {
    const dispatch = useDispatch();

    const [createManager, setCreateManager] = useState({
        file: '',
        imagePreviewUrl: null,
        nameManager: '',
        managerVKSP: '',
        top: 0,
        left: 0
    });

    const handleClose = () => setOpenModalWindow(false);

    const handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            setCreateManager({
                ...createManager,
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();

        const form = event.target;
        const avatar = form.managerIMG.value;
        const nameManager = form.manager.value;
        const managerVKSP = form.managerVKSP.value;

        setCreateManager({
            ...createManager,
            nameManager: nameManager,
            managerVKSP: managerVKSP
        })

        form.managerIMG.value = '';
        form.manager.value = '';
        form.managerVKSP.value = '';

        setOpenModalWindow(false);
    };

    useEffect(() => {
        if (createManager.file && createManager.imagePreviewUrl && createManager.nameManager && createManager.managerVKSP) {
            dispatch(addManager(createManager));
            setCreateManager({
                file: '',
                imagePreviewUrl: null,
                nameManager: '',
                managerVKSP: '',
                top: 0,
                left: 0
            })
        }
    }, [createManager]);

    return (
        <div>
            <Modal
                open={openModalWindow}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <div className={style.modal__imgPreview_wrap}>
                        {
                            createManager.imagePreviewUrl
                                ? <img className={style.modal__imgPreview} src={createManager.imagePreviewUrl} alt="avatar" />
                                : <span className={style.modal__previewText}>Пожалуйста, выберите аватарку для отображения</span>
                        }
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Кого готовимся намазывать? :-)
                    </Typography>
                    <form className={style.form} onSubmit={handleSubmitForm}>
                        <TextField id="standard-basic" type="file" onChange={handleImageChange} name="managerIMG" label="Фото" variant="standard" />
                        <TextField id="standard-basic" name="manager" label="Имя" variant="standard" />
                        <TextField id="standard-basic" name="managerVKSP" label="ВКСП" variant="standard" />
                        <Button type="submit" variant="contained">Создать</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalWindow;
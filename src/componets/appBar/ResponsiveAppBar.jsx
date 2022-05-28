import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {useDispatch} from "react-redux";
import {isAdmin} from "../../actions/authAction";

const ResponsiveAppBar = ({ openModalWindow }) => {
    const dispatch = useDispatch();

    const handleCreateManager = () => {
        console.log('Создать менеджера')
        openModalWindow(prevState => !prevState)
    };

    const [person, setPerson] = useState('admin');

    const handleChange = (event) => {
        setPerson(event.target.value);
    };

    useEffect(() => {
        dispatch(isAdmin(person));
    }, [person]);

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LunchDiningIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }}/>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        {
                            person === 'admin'
                                ? <Button
                                    onClick={handleCreateManager}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    создать икринку
                                </Button>
                                : <Typography textAlign="center">нет прав для создания икринки...</Typography>
                        }
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            person === 'admin'
                                ? <Button
                                    onClick={handleCreateManager}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    создать икринку
                                </Button>
                                : <Typography textAlign="center">нет прав для создания икринки...</Typography>
                        }
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={person}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="admin" control={<Radio color="default" />} label="Admin" />
                                <FormControlLabel value="user" control={<Radio color="default" />} label="User" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
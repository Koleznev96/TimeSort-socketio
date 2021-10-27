import React, {useEffect, useState, useContext} from 'react';

import {useHttp} from '../../../hooks/http.hook';

import { SortContext } from '../../../context/sortContext';

import {Button, Typography, Box, List, ListItem} from "@mui/material";


export const InputFile = () => {
    const rootSort = useContext(SortContext);
    const {request} = useHttp();
    const [listFiles, setListFiles] = useState([]);
    const [errorMass, setErrorMass] = useState({file: "", message: ""});

    const getListFiles = async () => {
        try {
            const data = await request('/api/sort/file_list', 'GET', null);
            setListFiles(data);
        } catch (e) {}
    }

    const inputMass = (data) => {
        let strMass = "";
        data.map((item, index) => strMass += item + (index !== data.length - 1 ? ", " : ""));
        rootSort.initStrMass(strMass);
    }

    const fileHandler = async (file_name) => {
        setErrorMass("");
        try {
            const data = await request(`/uploads/${file_name}`, 'GET', null);
            inputMass(data);
        } catch (e) {
            setErrorMass({file: file_name, message: "Не валидный JSON"});
        }
    }

    useEffect(() => {
        getListFiles();
    }, []);

    return (
        <Box sx={{marginTop: 2}}>
            <Typography>
                Доступные файлы для загрузки:
            </Typography>
            <List>
                {listFiles.map(item => (
                    <ListItem>
                        <Button
                            onClick={() => fileHandler(item)}
                        >
                            {item}
                        </Button>
                        {errorMass.file === item ? (
                            <Typography variant="caption" color="red" sx={{marginLeft: 2,}}>
                                {errorMass.message}
                            </Typography>
                        ) : null}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

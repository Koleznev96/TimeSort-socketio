import React, {useEffect, useState, useContext} from 'react';

import {useHttp} from '../../../hooks/http.hook';

import { SortContext } from '../../../context/sortContext';

import {Button, Typography, Box, List, ListItem} from "@mui/material";

import fs from "fs";


export const InputFile = () => {
    const rootSort = useContext(SortContext);
    const {request, error, clearError} = useHttp();
    const [listFiles, setListFiles] = useState([]);
    const [errorMass, setErrorMass] = useState({file: "", message: ""});

    // const downloadFileHandler = async () => {
    //     // console.log(file);
    //     // let uploadData = await new FormData(file);
    //     // console.log(uploadData);
    //     // uploadData.append('file', {type: 'json', uri: file, name: 'test-1.json'});
    //     try {
    //         const data = await request('/api/sort/input_file', 'POST', {file});
    //         // rootSort.setData([1, 5, 8, 3, 5, -1, 5, 8, -10, 4]);
    //     } catch (e) {}
    //     rootSort.initStrMass("1, 5, 8, 3, 5, -1, 5, 8, -100, 4");
    // };

    // const inputFileHandler = async (value) => {
    //     let reader = new FileReader(value.target.files[0]);
    //     console.log(reader)
    //     let file = value.target.files[0];
    //     setFile(file);
    // };

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
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    component="label"*/}
            {/*>*/}
            {/*    Upload File*/}
            {/*    <input*/}
            {/*        type="file"*/}
            {/*        hidden*/}
            {/*        onChange={(value) => inputFileHandler(value)}*/}
            {/*    />*/}
            {/*</Button>*/}

            {/*<Typography*/}
            {/*    variant="caption"*/}
            {/*    sx={{marginLeft: 2}}*/}
            {/*>*/}
            {/*    {file ? String(file) : null}*/}
            {/*</Typography>*/}

            {/*<Button*/}
            {/*    sx={{marginLeft: 2}}*/}
            {/*    onClick={() => downloadFileHandler()}*/}
            {/*>*/}
            {/*    Загрузить значения*/}
            {/*</Button>*/}
        </Box>
    );
}

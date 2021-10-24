import React, {useEffect, useState, useContext} from 'react';

import {useHttp} from '../../hooks/http.hook';

import {Paper} from "@mui/material";
import {Box} from "@mui/material";
import {Container} from "@mui/material";
import {Button} from "@mui/material";
import {TextField} from '@mui/material';
import {Typography} from '@mui/material';

import { SortContext } from '../../context/sortContext';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";


const rand = () => Math.floor(Math.random() * 1000);

const maxSizeLine = {
    width: 1000,
    height: 250,
    indent: 2
};

const sizeNewLines = (list) => {
    const width = list.length > 10 ? ((maxSizeLine.width - (maxSizeLine.indent * list.length)) / list.length) : 40;
    const maxValue = Math.max.apply(null, list);
    const heightList = list.map(item => item * 100 / maxValue);
    const indent = maxSizeLine.indent;
    return {width, heightList, indent};
};


export const ViewSort = () => {
    const rootSort = useContext(SortContext);
    const {request, error, clearError} = useHttp();
    const [strMass, setStrMass] = useState("");
    const [mass, setMass] = useState({data: []});
    const [errorMassage, setErrorMassage] = useState(null);
    const [errorMassageLenMass, setErrorMassageLenMass] = useState(null);
    const [lenMass, setLenMass] = useState(0);
    const [typeSort, setTypeSort] = useState(0);

    useEffect(() => {
        setTimeout(() => clearError(), 6000);
    }, [error]);

    useEffect(() => {
        setLenMass(30);
        randomHandler(30);
    }, []);

    useEffect(() => {
        if (rootSort.data) setMass(rootSort.data);
    }, [rootSort.data]);

    useEffect(() => {
        try {
            let new_mass = strMass.split(',');
            new_mass = new_mass.map(item => {
                if (!isNaN(Number(item))) {
                    return Number(item);
                } else throw new Error('Что-то пошло не так')
            });
            setLenMass(new_mass.length);
            setMass({data :new_mass, red_index: null});
            setErrorMassage(null);
        } catch (e) {
            setErrorMassage("Ошибка в веденном значении.");
        }
    }, [strMass]);

    const startSortHandler = async () => {
        try {
            const data = await request('/api/sort/start_sort', 'POST', {mass: mass.data, reverse: typeSort});
            console.log('start sort:', data);
        } catch (e) {}
    };

    const stopSortHandler = async () => {
        try {
            const data = await  request('/api/sort/stop_sort', 'POST', null);
            rootSort.stopSort();
            console.log('stop sort:', data);
        } catch (e) {}
    };

    const randomHandler = (lenMass) => {
        let new_mass = "";
        for (let i = 0; i < lenMass; i++) {
            new_mass += rand() + (i !== lenMass - 1 ? ", " : "");
        }
        setStrMass(new_mass);
    }

    const clearHandler = () => {
        setStrMass("");
    }

    const inputLenMass = (value) => {
        try {
            if (isNaN(Number(value))) {
                throw new Error('Введите число');
            }
            setLenMass(Number(value));
            setErrorMassageLenMass("");
        } catch (e) {}
    }

    const typeSortHandler = (value) => {
        setTypeSort(value);
    }

    const LineV = ({height, width, indent, index, red_index}) => {
        return (
            <Box sx={{
                backgroundColor: red_index === index ? 'red' : '#CECECE',
                width: width,
                height: height+'%',
                position: 'absolute',
                left: index * width + indent * index,
                bottom: 0
            }} >
                <Box sx={{width: width, height: width, backgroundColor: red_index === index ? '#CF5C5C' : '#9B9B9B'}} />
            </Box>
        );
    };

    const DrawingSort = () => {
        const {width, heightList, indent} = sizeNewLines(mass.data);
        return (
            <Box sx={{
                display: 'flex',
                position: 'relative',
                flexWrap: 'wrap',
                height: maxSizeLine.height,
            }} >
                {heightList.map((height, index) => (
                    <LineV height={height} width={width} indent={indent} index={index} red_index={mass.red_index}/>
                ))}
            </Box>
        );
    };

    return (
        <Container sx={{width: maxSizeLine.width + 42, marginTop: 10}}>
            <Paper
                sx={{height: maxSizeLine.height, width: '100%', padding: 1, paddingBottom: 6}}
            >
                <DrawingSort />
            </Paper>

            {!rootSort.isStatusSort ? (
                <>
                    <Paper
                        sx={{width: '100%', padding: 1, marginTop: 4}}
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Введите массив чисел через запятую"
                            fullWidth
                            value={strMass}
                            onChange={(value) => setStrMass(value.target.value)}
                        />
                        <Typography variant="caption" color="red">
                            {errorMassage}
                        </Typography>
                    </Paper>

                    <Paper
                        sx={{width: '100%', padding: 1, marginTop: 2, alignItems: 'center'}}
                    >
                        <TextField
                            required
                            id="len-mass"
                            label="Длина массива"
                            value={lenMass}
                            sx={{width: 120}}
                            onChange={(value) => inputLenMass(value.target.value)}
                        />
                        <Button
                            onClick={() => randomHandler(lenMass)}
                        >
                            Заполнить рандомно
                        </Button>

                        <Button
                            onClick={() => clearHandler()}
                        >
                            Отчистить
                        </Button>

                        <Box sx={{marginRight: 20}} />

                        <Typography variant="caption" color="red">
                            {errorMassageLenMass}
                        </Typography>
                    </Paper>

                    <Paper
                        sx={{width: '100%', padding: 1, marginTop: 4}}
                    >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Вид сортировки:</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={typeSort}
                                onChange={(value) => typeSortHandler(value.target.value)}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Reverse: False" />
                                <FormControlLabel value={1} control={<Radio />} label="Reverse: True" />
                            </RadioGroup>
                        </FormControl>

                        <Button
                            onClick={() => startSortHandler()}
                            fullWidth
                        >
                            Начать сортировку
                        </Button>
                    </Paper>
                </>
            ) : (
                <Paper
                    sx={{width: '100%', padding: 1, marginTop: 4}}
                >
                    <Button
                        onClick={() => stopSortHandler()}
                        fullWidth
                    >
                        Остановить сортировку
                    </Button>
                </Paper>
            )}
        </Container>
    );
}

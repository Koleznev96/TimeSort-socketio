import React from 'react';
import Box from '@mui/material/Box';

import { ViewSort } from '../ViewSort/ViewSort';


export const RootApp = () => {

    return (
        <Box sx={{ display: 'flex' }}>
            <ViewSort/>
        </Box>
    );
}

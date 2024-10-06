import React from 'react';
import { DrawItem } from 'src/sections/product/draw';
import Grid from "@mui/material/Unstable_Grid2";
import {_products} from "../_mock";
import {ProductItem} from "../sections/product/product-item";

const DrawResults = () => {
    return (
        <Grid container spacing={3}>
            <Grid key={123} xs={12} sm={6} md={3}>
                <DrawItem name={'drawing-1'} url={"something"} /> {/* Box 1 */}
            </Grid>
            <Grid key={123} xs={12} sm={6} md={3}>
                <DrawItem name={'drawing-1'} url={"something"} /> {/* Box 2 */}
            </Grid>
            <Grid key={123} xs={12} sm={6} md={3}>
                <DrawItem name={'drawing-1'} url={"something"} /> {/* Box 3 */}
            </Grid>
        </Grid>
    );
};

export default DrawResults;

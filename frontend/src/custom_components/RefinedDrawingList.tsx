import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

type Props = {
    url: string,
}

export function DrawItem({url} : Props) {

    const renderImg = (
        <Box
            component="img"
            src={url}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
            }}
        />
    );

    return (
        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {renderImg}
            </Box>
        </Card>
    );
}
import Grid from "@mui/material/Unstable_Grid2";

const DrawResults = ({refinedImageURLs} : {refinedImageURLs: string[]}) => {
    return (
        refinedImageURLs.length === 0 || refinedImageURLs[2] === "" ?
        <></> :
        <Grid container spacing={3}>
            <Grid  xs={4}>
                <DrawItem url={refinedImageURLs[0]} /> 
            </Grid>
            <Grid xs={4}>
                <DrawItem url={refinedImageURLs[1]} />
            </Grid>
            <Grid xs={4}>
                <DrawItem url={refinedImageURLs[2]} /> 
            </Grid>
        </Grid>
    );
};

export default DrawResults;

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

type Props = {
    url: string,
    name: string
}

export function DrawItem({url, name} : Props) {

    const renderImg = (
        <Box
            component="img"
            alt={name}
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

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
                    {name}
                </Link>
            </Stack>


        </Card>
    );
}
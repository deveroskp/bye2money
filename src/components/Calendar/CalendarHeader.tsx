import { Box, Typography, useTheme } from '@mui/material';

export function CalendarHeader() {
    const theme = useTheme();

    const dayBoxStyle = {
        flex: 1,
        display: 'flex',
        border: `1px solid ${theme.palette.divider}`,
        alignItems: 'center',
        justifyContent: 'center',
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: "50px",
                backgroundColor: theme.palette.background.paper,
                maxWidth: 1100,
                mx: 'auto',
                width: '100%',
            }}>
            <Box sx ={dayBoxStyle}>
                <Typography>일</Typography>
            </Box>
            <Box sx ={dayBoxStyle}>
                <Typography>월</Typography>
            </Box>
            <Box sx ={dayBoxStyle}>
                <Typography>화</Typography>
            </Box>
            <Box sx ={dayBoxStyle}>
                <Typography>수</Typography>
            </Box>
            <Box sx ={dayBoxStyle}>
                <Typography>목</Typography>
            </Box>
            <Box sx ={dayBoxStyle}>
                <Typography>금</Typography>
            </Box>
            <Box sx ={dayBoxStyle}>
                <Typography>토</Typography>
            </Box>
        </Box>  
    )
}
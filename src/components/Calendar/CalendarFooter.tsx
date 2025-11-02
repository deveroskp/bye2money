import {Box, Typography, useTheme} from '@mui/material';

import {useCalendarContext} from '../../contexts/CalendarContext';

export function CalendarFooter() {
    const theme = useTheme();
    const { totalIncome, totalExpense, totalSum } = useCalendarContext();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: 1100,
                mx: 'auto',
                width: '100%',
                padding: theme.spacing(1.5, 2),
            }}>
            <Box
                sx={{
                    display: 'flex',
                    gap: theme.spacing(4),
                }}>
                <Typography variant="body1" fontWeight={theme.typography.fontWeightMedium}>
                    총 수입 {totalIncome.toLocaleString()}원
                </Typography>
                <Typography variant="body1" fontWeight={theme.typography.fontWeightMedium}>
                    총 지출 {totalExpense.toLocaleString()}원
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1" fontWeight={theme.typography.fontWeightMedium}>
                    총합 {totalSum.toLocaleString()}원
                </Typography>
            </Box>
        </Box>
    )
}
import {Box, Typography, useTheme} from '@mui/material';

import {useCalendarContext} from '../../contexts/CalendarContext';

export function CalendarBody() {
    const theme = useTheme();
    const {weeks} = useCalendarContext();

    return (
        <Box
            sx={{
                maxWidth: 1100,
                mx: 'auto',
                width: '100%',
                border: `1px solid ${theme.palette.divider}`,
                borderTop: 'none',
                borderBottom: 'none',
            }}
        >
            {weeks.map((week, weekIndex) => (
                <Box
                    key={week[0]?.date ?? `week-${weekIndex}`}
                    sx={{
                        display: 'flex',
                        minHeight: 120,
                        borderBottom:
                            weekIndex === weeks.length - 1 ? 'none' : `1px solid ${theme.palette.divider}`,
                    }}
                >
                    {week.map((day, dayIndex) => {
                        const hasTransactions = day.transactions.length > 0;
                        const showIncome = day.incomeTotal > 0;
                        const showExpense = day.expenseTotal > 0;
                        const showNet = hasTransactions;

                        return (
                            <Box
                                key={day.date}
                                sx={{
                                    flex: 1,
                                    borderRight:
                                        dayIndex === week.length - 1
                                            ? 'none'
                                            : `1px solid ${theme.palette.divider}`,
                                    backgroundColor: day.isToday
                                        ? '#f0f5f8'
                                        : theme.palette.background.paper,
                                    opacity: day.isCurrentMonth ? 1 : 0.5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: theme.spacing(1.5),
                                    gap: theme.spacing(0.5),
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        alignSelf: 'flex-end',
                                        fontWeight: theme.typography.fontWeightMedium,
                                        display: day.isCurrentMonth ? 'block' : 'none',
                                    }}
                                >
                                    {day.day}
                                </Typography>
                                <Box
                                    sx={{
                                        mt: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: theme.spacing(0.5),
                                    }}
                                >
                                    {showIncome && (
                                        <Typography
                                            variant="body2"
                                            color={theme.palette.primary.main}
                                            fontWeight={theme.typography.fontWeightMedium}
                                        >
                                            {day.incomeTotal.toLocaleString()}원
                                        </Typography>
                                    )}
                                    {showExpense && (
                                        <Typography
                                            variant="body2"
                                            color="error.main"
                                            fontWeight={theme.typography.fontWeightMedium}
                                        >
                                            -{day.expenseTotal.toLocaleString()}원
                                        </Typography>
                                    )}
                                    {showNet && (
                                        <Typography
                                            variant="body2"
                                            fontWeight={theme.typography.fontWeightMedium}
                                            color="text.primary"
                                        >
                                            {day.netTotal.toLocaleString()}원
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            ))}
        </Box>
    );
}

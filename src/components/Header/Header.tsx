import React from 'react';

import { useAppContext } from '../../contexts/AppContext';
import { Box, IconButton, ToggleButton, ToggleButtonGroup, Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function Header() {
    const { year, setYear, month, setMonth, view, setView } = useAppContext();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthChangeHandler = (newMonth: number) => {
        if (newMonth > 12) {
            setYear(year + 1);
            setMonth(newMonth - 12);
        } else if (newMonth <= 0) {
            setYear(year - 1);
            setMonth(newMonth + 12);
        } else {
            setMonth(newMonth);
        }
    };

    const viewChangeHandler = (
        _event: React.MouseEvent<HTMLElement>,
        newView: string,
    ) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                zIndex: 1000,
                width: '100%',
                minHeight: 200,
                py: 4,
                backgroundColor: '#9f9e9e',
            }}>
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    width: '100%',
                    maxWidth: '1000px'
                }}>
                <Logo text="Wise Wallet" />
                <YearMonth
                    year={year}
                    month={month}
                    monthName={monthNames[month - 1]}
                    onMonthChange={monthChangeHandler}
                />
                <ViewTabs
                    view={view}
                    onViewChange={viewChangeHandler} />
            </Toolbar>
        </Box >
    );
}

function Logo({ text }: { text: string }) {
    return (
        <div>
            <Typography
                sx={{ 
                    fontWeight: "semibold",
                    color: "grey.900",
                    fontSize: "1.7rem",
                    fontFamily: "'Playfair Display', serif"
                    }}>
                {text}
            </Typography>
        </div>
    );
}

function YearMonth({ year, month, monthName, onMonthChange }: { year: number; month: number; monthName: string; onMonthChange: (newMonth: number) => void; }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
            <Typography
                variant="subtitle1"
                sx={{ color: "grey.600" }}>
                {year}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}>
                <IconButton
                    onClick={() => onMonthChange(month - 1)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography
                    variant="h4"
                    sx={{
                        minWidth: "80px",
                        textAlign: "center",
                        fontWeight: 1000
                    }}
                >
                    {month}
                </Typography>
                <IconButton
                    onClick={() => onMonthChange(month + 1)}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Typography variant="subtitle1">{monthName}</Typography>
        </Box>
    );
}

function ViewTabs({ view, onViewChange }: { view: string; onViewChange: (event: React.MouseEvent<HTMLElement>, newView: string) => void; }) {
    return (
        <ToggleButtonGroup
            value={view}
            exclusive
            onChange={onViewChange}>
            <ToggleButton
                value="list"
                sx={{ borderRadius: '50%' }}>
                <ListAltIcon />
            </ToggleButton>
            <ToggleButton
                value="calendar"
                sx={{ borderRadius: '50%' }}>
                <CalendarMonthIcon />
            </ToggleButton>
            <ToggleButton
                value="stats"
                sx={{ borderRadius: '50%' }}>
                <BarChartIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
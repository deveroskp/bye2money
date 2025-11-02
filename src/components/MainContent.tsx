import {Box } from '@mui/material';
import {Header} from './Header/Header';
import {InputBar} from './InputBar';
import {Transactions} from './Transaction/Transaction';
import {useAppContext} from '../contexts/AppContext';
import {InputBarProvider} from '../contexts/InputBarContext';
import {TransactionContextProvider} from '../contexts/TransactionContext';
import {Calendar} from './Calendar/Calender';

export function MainContent() {
    const {view} = useAppContext();

    return (
        <InputBarProvider>
            <TransactionContextProvider>
                <Box sx={{minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 8}}>
                    <Header />
                    {view === 'list' && <ListView />}
                    {view === 'calendar' && <CalendarView />}
                </Box>
            </TransactionContextProvider>
        </InputBarProvider>
    );
}

function ListView() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    px: 2,
                    mt: -5,
                }}
            >
                <InputBar />
            </Box>
            <Box
                sx={{
                    px: 2,
                    mt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Transactions />
            </Box>
        </>
    );
}

function CalendarView() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    px: 2,
                    mt: -5,
                    flexDirection: 'column',
                }}
            >
                <Calendar />
            </Box>
        </>
    )
}
import {Stack} from '@mui/material';
import {TransactionHeader} from './TransactionHeader';
import {TransactionList} from './TransactionList/TransactionList';

export function Transactions() {
    return (
        <Stack direction="column">
            <TransactionHeader />
            <TransactionList />
        </Stack>
    );
}
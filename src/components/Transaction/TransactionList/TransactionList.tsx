import { Box, Divider, Typography } from '@mui/material';
import { useTransactionContext } from '../../../contexts/TransactionContext';
import type { Transaction } from '../../../contexts/TransactionContext';
import { TransactionItem } from './TransactionItem/TransactionItem';
import { dayOfWeek } from '../../../utils/Date';

export function TransactionList() {
    const { transactions, incomeChecked, expensedChecked } = useTransactionContext();

    const groupedTransactions = transactions.reduce<Record<string, Transaction[]>>((groups, transaction) => {
        const date = transaction.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date] = [...groups[date], transaction];
        return groups;
    }, {});

    const sortedDates = Object.keys(groupedTransactions).sort((a, b) => (a < b ? 1 : -1));

    const TransactionList = sortedDates.map((date) => {
        const transactionsForDate = groupedTransactions[date].filter((tx) =>
            (incomeChecked && !tx.isExpense) || (expensedChecked && tx.isExpense)
        );

        if (transactionsForDate.length === 0) {
            return null;
        }

        const dateObj = new Date(date);
        const formattedDate = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${['일', '월', '화', '수', '목', '금', '토'][dayOfWeek(dateObj) - 1]}요일`;
        const totalIncome = transactionsForDate.filter(tx => !tx.isExpense).reduce((sum, tx) => sum + tx.amount, 0);
        const totalExpense = transactionsForDate.filter(tx => tx.isExpense).reduce((sum, tx) => sum + tx.amount, 0);

        return (
            <Box key={date}>
                <Box display="flex" flexDirection="row" sx={{ justifyContent: 'space-between', mt: 3, mb: 1 }}>
                <Typography variant="subtitle1">
                    {formattedDate}
                </Typography>
                <Typography variant="subtitle1">
                    {totalIncome > 0 && (
                        <span style={{ marginRight: '20px' }}>
                            수입 {totalIncome.toLocaleString()} 원
                        </span>
                    )}
                    {totalExpense > 0 && (
                        <span>
                            지출 {totalExpense.toLocaleString()} 원
                        </span>
                    )}
                </Typography>
                </Box>
                <Divider sx={{
                    backgroundColor: 'grey.900',
                }} />
                {transactionsForDate.map((tx) => (
                    <TransactionItem key={tx.id} transaction={tx} />
                ))}
                <Divider sx={{
                    backgroundColor: 'grey.900',
                }} />
            </Box>
        );
    });

    return (
        <Box>
            {TransactionList}
        </Box>
    );
}
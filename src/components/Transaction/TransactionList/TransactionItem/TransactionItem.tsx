import {Box, IconButton, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState} from 'react';
import type {Transaction} from '../../../../contexts/TransactionContext';
import {useTransactionContext} from '../../../../contexts/TransactionContext';
import {TransactionDeleteModal} from './TransactionDeleteModal';

type TransactionItemProps = {
    transaction: Transaction;
};

export function TransactionItem({transaction}: TransactionItemProps) {
    const theme = useTheme();
    const {editHandler, setTransactionToDelete} = useTransactionContext();
    const isExpense = transaction.isExpense;
    const amountSign = isExpense ? '-' : '+';
    const [modalOpen, setModalOpen] = useState(false);

    const hoverEffect = {
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: theme.palette.neutral[100],
        },
    };

    const categoryColorMap: Record<string, string> = {
        생활: theme.palette.category.life,
        '쇼핑/뷰티': theme.palette.category.shopping,
        '의료/건강': theme.palette.category.health,
        식비: theme.palette.category.food,
        교통: theme.palette.category.transport,
        '문화/여가': theme.palette.category.culture,
        미분류: theme.palette.category.ect,
        월급: theme.palette.category.salary,
        용돈: theme.palette.category.allowance,
        기타수입: theme.palette.category.otherIncome,
    };

    const categoryBackground = categoryColorMap[transaction.category] ?? theme.palette.neutral[200];

    const handleItemClick = () => {
        editHandler(transaction);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setTransactionToDelete(null);
    };

    return (
        <>
        <Box
            className="transaction-item"
            sx={{
                display: 'flex',
                alignItems: 'stretch',
                backgroundColor: theme.palette.background.paper,
                borderBottom: '1px solid',
                borderColor: theme.palette.neutral[200],
                minHeight: 64,
                width: '100%',
                ...hoverEffect,
            }}
            onClick={handleItemClick}
        >
            <Box
                sx={{
                    width: {xs: 80, md: 100},
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: categoryBackground,
                    px: 1,
                }}
            >
                <Typography variant="body2" sx={{textAlign: 'center', fontWeight: 600, color: theme.palette.text.primary}}>
                    {transaction.category}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    alignItems: {xs: 'flex-start', md: 'center'},
                    justifyContent: {xs: 'flex-start', md: 'space-between'},
                    gap: {xs: 0.5, md: 2},
                    px: {xs: 1.5, md: 2.5},
                    py: {xs: 1, md: 0},
                }}
            >
                <Typography variant="body2" sx={{color: theme.palette.text.primary, fontSize: '14px', lineHeight: '24px', fontWeight: 500}}>
                    {transaction.description}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.secondary,
                        minWidth: {md: 120},
                        textAlign: {xs: 'left', md: 'center'},
                    }}
                >
                    {transaction.paymentMethod}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: {xs: 'auto', md: 180},
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    position: 'relative',
                    px: {xs: 1.5, md: 2},
                }}
            >
                <Typography
                    variant="body2"
                    className="transaction-item__amount"
                    sx={{
                        fontWeight: 600,
                        color: isExpense ? theme.palette.error.main : theme.palette.primary.main,
                        pr: 0,
                        transition: 'padding-right 0.2s ease, color 0.2s ease',
                        '.transaction-item:hover &': {
                            pr: 8,
                        },
                    }}
                >
                    {amountSign}
                    {transaction.amount.toLocaleString()} 원
                </Typography>
                <IconButton
                    size="small"
                    className="transaction-item__delete"
                    sx={{
                        position: 'absolute',
                        right: {xs: 8, md: 16},
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                        color: theme.palette.error.main,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        borderRadius: 0,
                        '&:hover': {
                            backgroundColor: `${theme.palette.error.main}14`,
                        },
                        '.transaction-item:hover &': {
                            opacity: 1,
                        },
                    }}
                    onClick={(event) => {
                        event.stopPropagation();
                        setTransactionToDelete(transaction);
                        setModalOpen(true);
                    }}
                >
                    <CancelIcon fontSize="small" />
                    <Typography variant="caption" color={theme.palette.error.main} sx={{fontWeight: 600}}>
                        삭제
                    </Typography>
                </IconButton>
            </Box>
        </Box>
        <TransactionDeleteModal open={modalOpen} onClose={handleModalClose} transaction={transaction} />
        </>
    );
}
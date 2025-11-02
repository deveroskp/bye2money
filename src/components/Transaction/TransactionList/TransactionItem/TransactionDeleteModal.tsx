import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {useTransactionContext, type Transaction} from '../../../../contexts/TransactionContext';
import { theme } from '../../../../theme/theme';

type TransactionDeleteModalProps = {
    open: boolean;
    onClose: () => void;
    transaction: Transaction
};

export function TransactionDeleteModal({open, onClose, transaction}: TransactionDeleteModalProps) {
    const {deleteTransaction, transactionToDelete, setTransactionToDelete} = useTransactionContext();

    const handleDelete = () => {
        if (!transactionToDelete) {
            return;
        }
        deleteTransaction(transactionToDelete.id);
        setTransactionToDelete(null);
        onClose();
    };

    const transactionType = transaction.isExpense ? '지출' : '수입';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        overflow: 'hidden',
                        pt: 2,
                    },
                },
            }}
        >
            <DialogTitle
                sx={{textAlign: 'center', fontWeight: theme.typography.fontWeightLight, pb: 1}}
            >해당 내역을 삭제하시겠습니까?</DialogTitle>
            <DialogContent>
                <ol>
                    <li>카테고리: {transactionType} {transaction.category}</li>
                    <li>내용: {transaction.description}</li>
                    <li>결제 수단: {transaction.paymentMethod}</li>
                    <li>금액: {transaction.amount.toLocaleString()}원</li>
                </ol>
            </DialogContent>
            <DialogActions
                sx={{
                    px: 0,
                    pb: 0,
                    display: 'flex',
                    '& > :not(style)': {
                        flex: 1,
                        m: 0,
                        borderRadius: 0,
                        borderTop: '1px solid',
                        borderColor: 'grey.200',
                    },
                    '& > :first-of-type': {
                        borderRight: '1px solid',
                        borderColor: 'grey.200',
                    },
                }}
            >
                <Button onClick={onClose} sx={{py: 1.5}}>
                    취소
                </Button>
                <Button
                    onClick={handleDelete}
                    sx={{py: 1.5, color: theme.palette.error.main}}
                >
                    삭제
                </Button>
            </DialogActions>
        </Dialog>
    );
}
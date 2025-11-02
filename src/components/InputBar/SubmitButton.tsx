import {IconButton, Tooltip} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import {useInputBarContext} from '../../contexts/InputBarContext';
import {useTransactionContext} from '../../contexts/TransactionContext';

export function SubmitButton() {
    const {date, amount, isExpense, description, paymentMethod, category, resetForm} = useInputBarContext();
    const {addTransaction} = useTransactionContext();

    const handleSubmit = () => {
        if (!amount || !description || !paymentMethod || !category) {
            return;
        }
        const payload = {
            date,
            amount,
            isExpense,
            description,
            paymentMethod,
            category,
        };
        addTransaction(payload);
        resetForm();
    };

    return (
        <Tooltip title="저장">
            <IconButton
                onClick={handleSubmit}
                sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: 'grey.500',
                    color: 'common.white',
                    '&:hover': {
                        backgroundColor: 'grey.900',
                    },
                }}
            >
                <CheckIcon />
            </IconButton>
        </Tooltip>
    );
}

import type {ChangeEvent} from 'react';
import {Checkbox, FormControlLabel, Stack, Typography} from '@mui/material';
import {useTransactionContext} from '../../contexts/TransactionContext';

export function TransactionHeader() {
    const {
        TotalTransaction,
        incomeChecked,
        setIncomeChecked,
        expensedChecked,
        setExpensedChecked,
        totalIncomeAmount,
        totalExpenseAmount,
    } = useTransactionContext();

    const handleIncomeToggle = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIncomeChecked(checked);
    };

    const handleExpenseToggle = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setExpensedChecked(checked);
    };

    return (
        <Stack
            direction={{xs: 'column', md: 'row'}}
            spacing={{xs: 100, md: 122}}
            sx={{px: {xs: 1, md: 2}, py: 2}}
        >
            <Typography variant="body2" color="text.secondary" sx={{display: 'flex', alignItems: 'center'}}>
                전체 내역
                <Typography component="span" variant="body2" sx={{ml: 1, fontWeight: 700, color: 'text.primary'}}>
                    {TotalTransaction.toLocaleString()}건
                </Typography>
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                <FormControlLabel
                    control={<Checkbox size="small" color="default" checked={incomeChecked} onChange={handleIncomeToggle} />}
                    label={
                        <Typography component="span" variant="body2" sx={{fontWeight: 600}}>
                            수입{' '}
                            <Typography component="span" variant="body2" sx={{fontWeight: 700, color: 'text.primary'}}>
                                {totalIncomeAmount.toLocaleString()} 원
                            </Typography>
                        </Typography>
                    }
                />
                <FormControlLabel
                    control={<Checkbox size="small" color="default" checked={expensedChecked} onChange={handleExpenseToggle} />}
                    label={
                        <Typography component="span" variant="body2" sx={{fontWeight: 600}}>
                            지출{' '}
                            <Typography component="span" variant="body2" sx={{fontWeight: 700, color: 'text.primary'}}>
                                {totalExpenseAmount.toLocaleString()} 원
                            </Typography>
                        </Typography>
                    }
                />
            </Stack>
        </Stack>
    );
}
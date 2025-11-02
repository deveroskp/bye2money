import type {ChangeEvent} from 'react';
import {Button, InputAdornment, Stack, TextField, Typography} from '@mui/material';
import {useInputBarContext} from '../../contexts/InputBarContext';
import {parseNumberFromString} from '../../utils/formatter';

export function AmountField() {
    const {amount, setAmount, isExpense, setIsExpense} = useInputBarContext();

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        if (value.trim() === '') {
            setAmount(0);
            return;
        }
        const numericValue = parseNumberFromString(value);
        setAmount(numericValue);
    };

    return (
        <Stack spacing={1}>
            <Typography variant="caption" color="text.secondary">
                금액
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
                <Button
                    variant="outlined"
                    onClick={() => setIsExpense(!isExpense)}
                    sx={{
                        minWidth: 40,
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        fontWeight: 700,
                    }}
                >
                    {isExpense ? '-' : '+'}
                </Button>
                <TextField
                    value={amount === 0 ? '' : amount.toLocaleString()}
                    placeholder="0"
                    onChange={handleAmountChange}
                    type="text"
                    size="small"
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">원</InputAdornment>,
                            sx: {
                                backgroundColor: 'common.white',
                                borderRadius: 1,
                            },
                        },
                    }}
                    fullWidth
                />
            </Stack>
        </Stack>
    );
}

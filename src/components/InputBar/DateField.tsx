import {Stack, TextField, Typography} from '@mui/material';
import {useInputBarContext} from '../../contexts/InputBarContext';

export function DateField() {
    const {date, setDate} = useInputBarContext();

    return (
        <Stack spacing={1}>
            <Typography variant="caption" color="text.secondary">
                일자
            </Typography>
            <TextField
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                size="small"
                slotProps={{
                    input: {
                        sx: {
                            backgroundColor: 'common.white',
                            borderRadius: 1,
                        },
                    },
                }}
                fullWidth
            />
        </Stack>
    );
}

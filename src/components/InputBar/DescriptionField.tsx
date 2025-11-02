import {Stack, TextField, Typography} from '@mui/material';
import {useInputBarContext} from '../../contexts/InputBarContext';

export function DescriptionField() {
    const {description, setDescription, maxDescriptionLength} = useInputBarContext();
    const remaining = `${description.length}/${maxDescriptionLength}`;

    return (
        <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                    내용
                </Typography>
                <Typography variant="caption" color="text.disabled">
                    {remaining}
                </Typography>
            </Stack>
            <TextField
                placeholder="입력하세요"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                size="small"
                inputProps={{maxLength: maxDescriptionLength}}
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

import {useState} from 'react';
import {Button, Stack, Typography} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useInputBarContext} from '../../../contexts/InputBarContext';
import {CategoryDropdown} from './CategoryDropdown';

export function CategoryField() {
    const {category} = useInputBarContext();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl((prev) => (prev ? null : event.currentTarget));
    };

    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);

    return (
        <Stack spacing={1}>
            <Typography variant="caption" color="text.secondary">
                분류
            </Typography>
            <Button
                variant="outlined"
                onClick={handleToggle}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                    justifyContent: 'space-between',
                    color: category ? 'text.primary' : 'text.disabled',
                    borderRadius: 1,
                    height: 40,
                    textTransform: 'none',
                    backgroundColor: 'common.white',
                }}
            >
                {category || '선택하세요'}
            </Button>
            <CategoryDropdown open={open} anchorEl={anchorEl} onClose={handleClose} />
        </Stack>
    );
}

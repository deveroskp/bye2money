import {ClickAwayListener, List, ListItemButton, ListItemText, Paper, Popper} from '@mui/material';
import {useInputBarContext} from '../../../contexts/InputBarContext';

type CategoryDropdownProps = {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
};

export function CategoryDropdown({open, anchorEl, onClose}: CategoryDropdownProps) {
    const {categoryOptions, setCategory} = useInputBarContext();

    const handleSelect = (value: string) => {
        setCategory(value);
        onClose();
    };

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
            modifiers={[{name: 'offset', options: {offset: [0, 4]}}]}
        >
            <ClickAwayListener onClickAway={onClose}>
                <Paper elevation={3} sx={{minWidth: 180}}>
                    <List dense>
                        {categoryOptions.map((option) => (
                            <ListItemButton key={option.value} onClick={() => handleSelect(option.label)}>
                                <ListItemText primary={option.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
}

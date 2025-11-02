import {ClickAwayListener, Divider, IconButton, List, ListItemButton, ListItemText, Paper, Popper} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import type {PaymentMethodOption} from '../../../contexts/InputBarContext';
import {useInputBarContext} from '../../../contexts/InputBarContext';

type PaymentMethodDropdownProps = {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onAddRequest: () => void;
    onRemoveRequest: (option: PaymentMethodOption) => void;
};

export function PaymentMethodDropdown({open, anchorEl, onClose, onAddRequest, onRemoveRequest}: PaymentMethodDropdownProps) {
    const {paymentMethodOptions, setPaymentMethod} = useInputBarContext();

    const handleSelect = (option: PaymentMethodOption) => {
        setPaymentMethod(option.label);
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
                <Paper elevation={3} sx={{minWidth: 200, borderRadius: 2, overflow: 'hidden'}}>
                    <List dense>
                        {paymentMethodOptions.map((option) => (
                            <ListItemButton key={option.value} onClick={() => handleSelect(option)} sx={{gap: 1}}>
                                <ListItemText primary={option.label} />
                                <IconButton
                                    edge="end"
                                    size="small"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onClose();
                                        onRemoveRequest(option);
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </ListItemButton>
                        ))}
                    </List>
                    <Divider />
                    <List dense>
                        <ListItemButton
                            onClick={() => {
                                onClose();
                                onAddRequest();
                            }}
                            sx={{gap: 1}}
                        >
                            <AddIcon fontSize="small" />
                            <ListItemText primary="추가하기" slotProps={{primary: {fontWeight: 600}}} />
                        </ListItemButton>
                    </List>
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
}

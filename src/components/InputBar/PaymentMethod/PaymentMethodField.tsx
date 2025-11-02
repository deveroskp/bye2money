import {useMemo, useState} from 'react';
import {Button, Stack, Typography} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type {PaymentMethodOption} from '../../../contexts/InputBarContext';
import {useInputBarContext} from '../../../contexts/InputBarContext';
import {PaymentMethodDropdown} from './PaymentMethodDropdown';
import {PaymentMethodModal} from './PaymentMethodModal';

export function PaymentMethodField() {
    const {paymentMethod, addPaymentMethod, removePaymentMethod, paymentMethodOptions} = useInputBarContext();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [modalState, setModalState] = useState<{mode: 'add'} | {mode: 'remove'; option: PaymentMethodOption} | null>(null);
    const [newMethodLabel, setNewMethodLabel] = useState('');

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl((prev) => (prev ? null : event.currentTarget));
    };

    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);

    const handleAddRequest = () => {
        setModalState({mode: 'add'});
        setNewMethodLabel('');
    };

    const handleRemoveRequest = (option: PaymentMethodOption) => {
        setModalState({mode: 'remove', option});
        setNewMethodLabel(option.label);
    };

    const handleModalClose = () => {
        setModalState(null);
        setNewMethodLabel('');
    };

    const handleAddConfirm = () => {
        if (!newMethodLabel.trim()) {
            return;
        }
        addPaymentMethod(newMethodLabel);
        handleModalClose();
    };

    const handleRemoveConfirm = () => {
        if (modalState?.mode !== 'remove') {
            return;
        }
        removePaymentMethod(modalState.option);
        handleModalClose();
    };

    const modalOpen = Boolean(modalState);
    const isAddMode = modalState?.mode === 'add';
    const duplicateLabel = useMemo(
        () =>
            isAddMode && newMethodLabel
                ? paymentMethodOptions.some((option) => option.label === newMethodLabel.trim())
                : false,
        [isAddMode, newMethodLabel, paymentMethodOptions],
    );
    return (
        <>
            <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                    결제수단
                </Typography>
                <Button
                    variant="outlined"
                    onClick={handleToggle}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                        justifyContent: 'space-between',
                        color: paymentMethod ? 'text.primary' : 'text.disabled',
                        borderRadius: 1,
                        height: 40,
                        textTransform: 'none',
                        backgroundColor: 'common.white',
                    }}
                >
                    {paymentMethod || '선택하세요'}
                </Button>
                <PaymentMethodDropdown
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    onAddRequest={handleAddRequest}
                    onRemoveRequest={handleRemoveRequest}
                />
            </Stack>
            <PaymentMethodModal
                open={modalOpen}
                modalState={modalState}
                newMethodLabel={newMethodLabel}
                duplicateLabel={duplicateLabel}
                onClose={handleModalClose}
                onLabelChange={setNewMethodLabel}
                onAddConfirm={handleAddConfirm}
                onRemoveConfirm={handleRemoveConfirm}
            />
        </>
    );
}

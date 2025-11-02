import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from '@mui/material';
import type {PaymentMethodOption} from '../../../contexts/InputBarContext';
import { theme } from '../../../theme/theme';

type PaymentMethodModalState = {mode: 'add'} | {mode: 'remove'; option: PaymentMethodOption} | null;

type PaymentMethodModalProps = {
    open: boolean;
    modalState: PaymentMethodModalState;
    newMethodLabel: string;
    duplicateLabel: boolean;
    onClose: () => void;
    onLabelChange: (value: string) => void;
    onAddConfirm: () => void;
    onRemoveConfirm: () => void;
};

export function PaymentMethodModal({
    open,
    modalState,
    newMethodLabel,
    duplicateLabel,
    onClose,
    onLabelChange,
    onAddConfirm,
    onRemoveConfirm,
}: PaymentMethodModalProps) {
    if (!modalState) {
        return null;
    }

    const isAddMode = modalState.mode === 'add';

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
            <DialogTitle sx={{textAlign: 'center', fontWeight: theme.typography.fontWeightBold, pb: 1}}>
                {isAddMode ? '결제수단 추가' : modalState.option.label}
            </DialogTitle>
            <DialogContent sx={{pt: 0}}>
                <Typography variant="body2" align="center" sx={{mb: 3}}>
                    {isAddMode ? '추가하실 결제 수단을 입력해주세요.' : '해당 결제 수단을 삭제하시겠습니까?'}
                </Typography>
                <TextField
                    fullWidth
                    placeholder="결제 수단을 입력하세요"
                    value={isAddMode ? newMethodLabel : modalState.option.label}
                    onChange={(event) => onLabelChange(event.target.value)}
                    autoFocus={isAddMode}
                    slotProps={{
                        input: {readOnly: !isAddMode},
                    }}
                />
                {duplicateLabel && (
                    <Typography variant="caption" color="error" sx={{mt: 1, display: 'block', textAlign: 'center'}}>
                        이미 존재하는 결제 수단입니다.
                    </Typography>
                )}
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
                    onClick={isAddMode ? onAddConfirm : onRemoveConfirm}
                    color={isAddMode ? 'primary' : 'error'}
                    disabled={isAddMode ? (!newMethodLabel.trim() || duplicateLabel) : false}
                    sx={{py: 1.5, fontWeight: 700}}
                >
                    {isAddMode ? '추가' : '삭제'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

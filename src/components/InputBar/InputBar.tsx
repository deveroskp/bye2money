import { Paper, Box, Divider, Stack } from '@mui/material';
import { DateField } from './DateField';
import { AmountField } from './AmountField';
import { DescriptionField } from './DescriptionField';
import { PaymentMethodField } from './PaymentMethod/PaymentMethodField';
import { CategoryField } from './Category/CategoryField';
import { SubmitButton } from './SubmitButton';

export function InputBar() {
    return (
        <Paper
            elevation={1}
            sx={{
                width: '100%',
                maxWidth: '1300px',
                position: 'relative',
                zIndex: 1,
                overflow: 'visible',
            }}
        >
            <Stack
                direction="row"
                alignItems="stretch"
                divider={
                    <Divider
                        orientation="vertical"
                        sx={{
                            backgroundColor: 'grey.500',
                        }}
                        flexItem
                    />
                }
            >
                <Box sx={{ flex: 1.1, p: 2 }}>
                    <DateField />
                </Box>
                <Box sx={{ flex: 1.6, p: 2 }}>
                    <AmountField />
                </Box>
                <Box sx={{ flex: 2, p: 2 }}>
                    <DescriptionField />
                </Box>
                <Box sx={{ flex: 1.2, p: 2 }}>
                    <PaymentMethodField />
                </Box>
                <Box sx={{ flex: 1.2, p: 2 }}>
                    <CategoryField />
                </Box>
                <Box
                    sx={{
                        width: 96,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                    }}
                >
                    <SubmitButton />
                </Box>
            </Stack>
        </Paper>
    );
}

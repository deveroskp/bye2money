import {createTheme} from '@mui/material/styles';
import {colorTokens, typographyTokens} from './tokens';

declare module '@mui/material/styles' {
    interface Palette {
        neutral: typeof colorTokens.neutral;
        category: typeof colorTokens.category;
    }

    interface PaletteOptions {
        neutral?: typeof colorTokens.neutral;
        category?: typeof colorTokens.category;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

const primaryMain = colorTokens.primary[500];
export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryMain,
            light: colorTokens.primary[300],
            dark: colorTokens.primary[700],
        },
        secondary: {
            main: colorTokens.neutral[700],
        },
        error: {
            main: colorTokens.danger[500],
            light: colorTokens.danger[200],
            dark: colorTokens.danger[400],
        },
        success: {
            main: colorTokens.success[500],
        },
        background: {
            default: colorTokens.neutral[50],
            paper: colorTokens.neutral[0],
        },
        neutral: colorTokens.neutral,
        category: colorTokens.category,
        text: {
            primary: colorTokens.neutral[800],
            secondary: colorTokens.neutral[500],
        },
    },
    typography: {
        fontFamily: typographyTokens.body1.fontFamily,
        h1: typographyTokens.heading1,
        h2: typographyTokens.heading2,
        body1: typographyTokens.body1,
        body2: typographyTokens.body2,
        caption: typographyTokens.caption,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    textTransform: 'none',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                },
                outlined: {
                    borderWidth: 1,
                    ':hover': {
                        borderWidth: 1,
                    },
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        fontSize: '14px',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: colorTokens.neutral[300],
                    '&.Mui-checked': {
                        color: primaryMain,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 8,
                    padding: '6px 10px',
                    fontSize: '12px',
                },
            },
        },
    },
});

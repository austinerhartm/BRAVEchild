import { createTheme } from '@mui/material/styles';

// Define the application color palette
const palette = {
    primary: {
        main: 'rgb(140, 0, 175)', // Purple from your homepage
        light: '#b54cc2',
        dark: '#6a0085',
        contrastText: '#fff',
    },
    secondary: {
        main: '#008b8b', // Hex equivalent of darkcyan
        light: '#00b5b5',
        dark: '#007070',
        contrastText: '#fff',
    },
    success: {
        main: 'rgb(127, 247, 127)', // Light green from your homepage
        light: '#a0ffa0',
        dark: '#45a049',
        contrastText: '#000',
    },
    info: {
        main: 'rgb(205, 242, 255)', // Light blue from your homepage
        light: '#e6f7ff',
        dark: '#0099cc',
        contrastText: '#000',
    },
    warning: {
        main: 'rgb(244, 241, 41)', // Yellow from your homepage
        light: '#ffff78',
        dark: '#c7c500',
        contrastText: '#000',
    },
    error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
        contrastText: '#fff',
    },
    background: {
        default: '#e8f5e9', // Light green background from your homepage
        paper: '#ffffff',
        card: '#ffffff',
    },
    text: {
        primary: '#333333',
        secondary: '#666666',
        disabled: '#999999',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
};

// Define component overrides
const components = {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                borderRadius: 6,
                fontWeight: 600,
                fontFamily: '"nunito", "roboto", "proxima-nova", sans-serif',
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 2px 4px',
                '&:hover': {
                    boxShadow: 'rgba(0, 0, 0, 0.15) 1px 4px 8px',
                },
            },
            contained: {
                '&.MuiButton-containedPrimary': {
                    backgroundColor: palette.primary.main,
                    '&:hover': {
                        backgroundColor: palette.primary.dark,
                    },
                },
                '&.MuiButton-containedSecondary': {
                    backgroundColor: palette.secondary.main,
                    '&:hover': {
                        backgroundColor: palette.secondary.dark,
                    },
                },
            },
            outlined: {
                borderWidth: 1,
                '&:hover': {
                    borderWidth: 1,
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
                overflow: 'hidden',
            },
        },
    },
    MuiCardHeader: {
        styleOverrides: {
            root: {
                padding: '16px 24px',
            },
            title: {
                fontSize: '1.25rem',
                fontWeight: 600,
            },
        },
    },
    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: '24px',
                '&:last-child': {
                    paddingBottom: '24px',
                },
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    borderRadius: 6,
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.primary.main,
                        borderWidth: 2,
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: palette.primary.main,
                },
            },
        },
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                fontWeight: 700,
                backgroundColor: palette.secondary.main,
                color: palette.secondary.contrastText,
            },
            root: {
                padding: '12px 16px',
            },
        },
    },
    MuiTableRow: {
        styleOverrides: {
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                },
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 8,
            },
            elevation1: {
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            },
            elevation2: {
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
            elevation3: {
                boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
            },
        },
    },
    MuiTab: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                fontWeight: 600,
                '&.Mui-selected': {
                    color: palette.primary.main,
                },
            },
        },
    },
    MuiTabs: {
        styleOverrides: {
            indicator: {
                backgroundColor: palette.primary.main,
            },
        },
    },
    MuiAlert: {
        styleOverrides: {
            root: {
                borderRadius: 6,
            },
        },
    },
    MuiFormLabel: {
        styleOverrides: {
            root: {
                fontWeight: 600,
                marginBottom: '4px',
                '&.Mui-focused': {
                    color: palette.primary.main,
                },
            },
        },
    },
    MuiFormControl: {
        styleOverrides: {
            root: {
                marginBottom: '16px',
            },
        },
    },
    MuiDialog: {
        styleOverrides: {
            paper: {
                borderRadius: 8,
            },
        },
    },
};

// Define typography settings
const typography = {
    fontFamily: '"nunito", "roboto", "proxima-nova", "proxima nova", sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.3,
    },
    h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
    },
    h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
    },
    h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
    },
    body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
    },
    body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
    },
    button: {
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
    },
};

// Create and export the theme
const theme = createTheme({
    palette,
    typography,
    components,
    shape: {
        borderRadius: 8,
    },
});

export default theme;
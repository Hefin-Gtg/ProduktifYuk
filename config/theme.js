import {
    MD3LightTheme as DefaultTheme
} from 'react-native-paper';


const theme = {
    ...DefaultTheme,
    myOwnProperty:true,
    colors : {
        "primary": "rgb(0, 106, 106)",
        "onPrimary": "rgb(255, 255, 255)",
        "primaryContainer": "rgb(0, 251, 251)",
        "onPrimaryContainer": "rgb(0, 32, 32)",
        "secondary": "rgb(74, 99, 99)",
        "onSecondary": "rgb(255, 255, 255)",
        "secondaryContainer": "rgb(204, 232, 231)",
        "onSecondaryContainer": "rgb(5, 31, 31)",
        "tertiary": "rgb(75, 96, 124)",
        "onTertiary": "rgb(255, 255, 255)",
        "tertiaryContainer": "rgb(211, 228, 255)",
        "onTertiaryContainer": "rgb(4, 28, 53)",
        "error": "rgb(186, 26, 26)"
    },
    roundness: 20
}


export default theme;
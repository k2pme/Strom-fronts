import {createTheme, rgbToHex} from '@mui/material';

export const KiosqueStandarsColors = createTheme({
    palette : {
        primary :{
            main : "#16067A",
        },

        secondary : {
            main : "#1E1D26"
        },

        error : {
            main : "#F24822"
        },

        success : {
            main : "#53A465"
        },

        swift_grey :{
            main : '#95A5A6'
        },

        gentle_black : {
            main : '#383838'
        },
        warning : {
            main : "#C57B0D"
        } ,
		
		background : {
            main : "#FFFFFF",
        },
		text : {
         main :   "#000000"
        },

		soft_text : {
            main : "#404040"
        },

    }
})

export const secondaryText = {
    color : '#3498DB',
}
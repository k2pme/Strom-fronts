import {TextField, Select, MenuItem, FormControl, Grid, Button, Container,IconButton, List, InputLabel, LinearProgress, CircularProgress} from '@mui/material';
import DialogPage from "./DialogPage";
import {useState, useEffect} from 'react';
import { KiosqueStandarsColors } from "../Styles/Colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { login, Playing } from '../Styles/Containers';
import {createTheme, ThemeProvider} from '@mui/material';
import { fieldStyle } from '../Styles/Fields';
import { BtnStyle } from '../Styles/Buttons';
import DailogPage from './DialogPage';
import { AudioFile, DiscFull, Discount, LineStyle, LinearScale, MusicNote, NextPlan, PauseCircleFilledRounded, PauseCircleOutlineRounded, PlayCircle, PlayCircleFilledRounded, SkipNext, SkipNextRounded, SkipPrevious } from '@mui/icons-material';
import Player from './Player';





export default function Home({ trackName, artistName, streamUrl }){
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setErrorMessage] = useState(null)
    const [severity, setSeverity] = useState(null)

    const [openDialog, setOpenDialog] = useState(false)
    const [content, setContent] = useState(null)

    const navigate = useNavigate();


    const handleClose = ()=>{
        setOpenDialog(false)
    }
    return(
        <>
        
        <Grid container spacing={2}>
        <ThemeProvider theme={KiosqueStandarsColors}>
      
            {/*<Grid item xs={4}>
                <p>Recherche</p>
                <p>Playlist</p>

    </Grid>*/}
            <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} xs={12}> 
                   <Player streamUrl={"Avicii.mp3"}/>
                   
            </Grid>

            

            {/* Colonne 3 
            <Grid item xs={4}>
                <p>lyrics</p>
                <p>Accords</p>
                <p>About artist</p>
            </Grid>*/}
            </ThemeProvider>
        </Grid>
        

        
        </>
        
    );}
import {TextField, Select, MenuItem, FormControl, Grid, Button, Container,IconButton, List, InputLabel, LinearProgress} from '@mui/material';
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
import { AudioFile, DiscFull, Discount, LineStyle, LinearScale, LoopRounded, MusicNote, NextPlan, PauseCircleFilledRounded, PauseCircleOutlineRounded, PlayCircle, PlayCircleFilledRounded, Share, ShuffleOn, ShuffleRounded, SkipNext, SkipNextRounded, SkipPrevious } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';





export default function Player({ trackName, artistName, streamUrl }){
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setErrorMessage] = useState(null)
    const [severity, setSeverity] = useState(null)

    const [openDialog, setOpenDialog] = useState(false)
    const [content, setContent] = useState(null)
    const [audio, setAudio] = useState(new Audio());
    

    const [play, setPlay] = useState(false)
    const [playing, setPlaying] = useState(0);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);






    const [loop, setLoop] = useState(false);
    const [suffle, setSuffle] = useState(false);


    const [wallpaper, setWallpaper] = useState('1.jpeg');
    const [bgColor, setBgColor] = useState('white')


    const navigate = useNavigate();

    audio.addEventListener('play', (p)=>{
        
    })

    audio.addEventListener('ended', ()=>{
        
        if(loop){
            setCurrentTime(0)
            setPlay(true);
            setPlaying(0)
            audio.play()

        }else{
            setCurrentTime(0)
            setPlay(false);
            setPlaying(0)
        }
        })

    useEffect(()=>{

    })


    useEffect(() => {
        // Mettre à jour l'audio lorsqu'une nouvelle piste est sélectionnée
        setAudio(new Audio(streamUrl));
        }, [streamUrl]);


    useEffect(() => {
        // Mettre à jour la valeur de playing lors de la lecture de l'audio
        
        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
          setPlaying((audio.currentTime * 100) / audio.duration);
        };

        const handleDurationChange = () => {
            setDuration(audio.duration)
        }
      
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('durationchange', handleDurationChange)
        
        // Nettoyer l'écouteur lors du démontage du composant
        return () => { 
          audio.removeEventListener('timeupdate', updateProgress);
          audio.removeEventListener('durationchange', handleDurationChange);

        };
      }, [audio]);

      const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

    const handleClose = ()=>{
        setOpenDialog(false)
    }

  
    return(
        <>
        <div style={{height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundImage: `url(${wallpaper})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(20px)', // Ajustez la valeur pour obtenir le flou souhaité
    zIndex: -2}}/>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}  // Durée d'affichage en millisecondes (ajustez selon vos besoins)
                onClose={()=>{
                    setOpenSnackbar(false)
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                style={{width : '300px'}}

            >
                <MuiAlert
                elevation={6}
                variant="filled"
                onClose={()=>{
                    setOpenSnackbar(false)
                }}
                severity={severity}
                >
                {error}
                </MuiAlert>
            </Snackbar>

            <img style={Playing} src={wallpaper}/>
            

            
            <div>
            <Typography variant="caption" color="textSecondary" style={{ textAlign: 'left', marginRight : '20px' }}>
                {formatTime(currentTime)}
            </Typography>
            <Slider
            sx={{width : '300px', height:"2px"}}
                value={playing}
                onChange={(event, newValue) => {
                    setPlaying(newValue);
                    audio.currentTime = (newValue / 100) * audio.duration;
                }}
                aria-labelledby="continuous-slider"
                

            />
            <Typography variant="caption" color="textSecondary" style={{ textAlign: 'right', marginLeft : '15px' }}>
                {formatTime(duration)}
            </Typography>

                <p>{play.toString}</p>
                <IconButton color="sweet_grey">
                    <SkipNextRounded fontSize="large" />
                </IconButton>
                <IconButton
                    color="sweet_grey"
                    onClick={() => {
                    setPlay(!play);
                    if(play){
                        audio.pause()
                    }else{  
                        audio.play()

                    }

                    }}
                >
                    {!play && <PlayCircleFilledRounded fontSize="large" color='text'/>}
                    {play && <PauseCircleFilledRounded fontSize="large" color='primary'/>}
                </IconButton>
                <IconButton color="sweet_grey">
                    <SkipNextRounded fontSize="large" />
                </IconButton>
            </div>
            <div style={{position:'relative', right:'90px'}}>
                <IconButton
                    onClick={(event)=>{
                        setLoop(!loop)
                        if(play){

                        }else{  
                            setPlay(true)
                            audio.play()
    
                        }
                        
                    }}
                >
                    {loop && <LoopRounded color='primary'/>}
                    {!loop && <LoopRounded/>}
                   
                </IconButton>

                <IconButton
                    onClick={()=>{
                        setSuffle(!suffle);
                    }}
                >
                    {suffle && <ShuffleRounded color='primary'/>}
                    {!suffle && <ShuffleRounded/>}

                </IconButton>

                <IconButton
                    style={{position:'relative', left:'170px'}}
                >
                    <Share/>
                </IconButton>
            </div>

            
            

            <DailogPage 
                open={openDialog}
                handleClose={handleClose}
                content={content}
            ></DailogPage>
        </>
        
    );}
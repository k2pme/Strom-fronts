import {TextField, Select, MenuItem, FormControl, Grid, Button, Container,IconButton, List, InputLabel} from '@mui/material';
import {useState, useEffect} from 'react';
import { KiosqueStandarsColors, secondaryText } from '../Styles/Colors';
import { loginContainers, loginContainers_phone, login } from '../Styles/Containers';
import { fieldStyle } from '../Styles/Fields';
import { BtnStyle, gpBtn } from '../Styles/Buttons';
import {createTheme, ThemeProvider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import axios from 'axios';
import { da } from 'date-fns/locale';
import {format, set} from 'date-fns';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DailogPage from './DialogPage';

export default function SigninPage(){

    const [errorName, setErrorName] = useState(false);
    const [errorPrenom, setErrorPrenom] = useState(false);
    const [errorBirth, setErrorBirth] = useState(false);
    const [errorSex, setErrorSex] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const [name, setName] = useState(null)
    const [nachname, setNachname] = useState(null)
    const [sex, setSex] = useState(null)
    const [birth, setBirth] = useState(null)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)


    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setErrorMessage] = useState(null)
    const [severity, setSeverity] = useState(null)

    const [openDialog, setOpenDialog] = useState(false)
    const [content, setContent] = useState(null)

    const navigate = useNavigate();

    const handleClose = ()=>{
        setOpenDialog(false)
    }

    const register = async ()=>{

        setName(document.getElementById('name').value);
        setNachname(document.getElementById('nachname').value);
        setPassword(document.getElementById('password').value);
        setBirth(document.getElementById('birth').value)
        
        //setSex(document.getElementById('sex').value);
        setEmail(document.getElementById('email').value);

        console.log(name, nachname, password, birth, sex, email)

        if(name && nachname && (password && password.length >= 8) && birth && sex && email){

            try{

                const rep = await axios.post(
                    "http://127.0.0.1:4002/signin",
                    {
                        name,
                        nachname,
                        password,
                        birth,
                        sex,
                        email,
                        
                    }, {
                            
                        withCredentials : true,
                        
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer your_token_here',
                            }
                    });

                    if(rep.status === 202){
                        setErrorMessage(rep.data)
                        setSeverity('info')
                        setOpenSnackbar(true)
                    }else{
                        setContent(rep.data);
                        setOpenDialog(true);
                        /*setErrorMessage(rep.data)
                        setSeverity('success')
                        setOpenSnackbar(true)*/
                        setContent(rep.data)
                        setOpenDialog(true)
                        navigate('/login');
                    }

                    

            }catch(error){
                alert(error)
                
                setErrorMessage("Revenez plutard, s'il vous plait")
                setSeverity('error')
                setOpenSnackbar(true)
            }


        }else{
            
            setErrorMessage("Revoyer vos données s'il vous plait")
            setSeverity('error')
            setOpenSnackbar(true)

        }
    }



    return (
        <>
        <Container  sx={login}>
            
                <Grid container spacing={4} alignItems={"center"} justifyContent={"center"} direction={"column"}>
                    <ThemeProvider theme={KiosqueStandarsColors}>
                    <Grid item xs={12}>
                        <h2>Inscrivez vous Vite ! </h2>
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
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Prenom"
                            //value={nachname}
                            id='nachname'
                            onBlur={(event)=>{setTimeout(() => {
                                if(!event.target.value){
                                    setErrorPrenom(true)
                                }else{
                                    setErrorPrenom(false)
                                    setNachname(event.target.value)

                                }
                            }, 1000);}}
                            variant="outlined"
                            sx={fieldStyle}
                            error={errorPrenom}
                            type="text"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Nom"
                            //value={name}
                            id='name'
                            onBlur={(event)=>{setTimeout(() => {
                                if(!event.target.value){
                                    setErrorName(true)
                                }else{
                                    setErrorName(false)
                                    setName(event.target.value)
                                }
                            }, 1000);}}
                            variant="outlined"
                            sx={fieldStyle}
                            type="text"
                            error={errorName}
                        >
                        </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                    <TextField
                            label=""
                            //value={birth}
                            id='birth'
                            onBlur={(event)=>{setTimeout(() => {
                                if(!event.target.value){
                                    setErrorBirth(true)
                                }else{
                                    setErrorBirth(false)
                                    setBirth(event.target.value)


                                }
                            }, 1000);}}
                            variant="outlined"
                            sx={fieldStyle}
                            error={errorBirth}
                            type="date"
                        >
                        </TextField>
                            
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Genre</InputLabel>
                            <Select
                                value={sex}
                                label="Genre"
                                onChange={(event)=>{setTimeout(() => {
                                    if(!event.target.value){
                                        setErrorSex(true)
                                    }else{

                                        setErrorSex(false)
                                        setSex(event.target.value);
                                    
                                        
                                    }
                                }, 1000);}}
                                id = "sex"
                                error={errorSex}
                                sx={fieldStyle}
                               
                            >
                                <MenuItem value={"M"}>Masculin</MenuItem>
                                <MenuItem value={"F"}>Feminin</MenuItem>

                            </Select>
                            
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            //value={email}
                            variant="outlined"
                            onBlur={(event)=>{setTimeout(() => {
                                if(!event.target.value){
                                    setErrorEmail(true)
                                }else{
                                    setErrorEmail(false)
                                    setEmail(event.target.value)

                                    //alert(email);
                                }
                            }, 1000);}}
                            onChange={(event)=>{setTimeout(() => {
                                if(!event.target.value){
                                    setErrorEmail(true)
                                }else{
                                    setErrorEmail(false)
                                    setEmail(event.target.value)

                                }
                            }, 1000);}}
                            id='email'
                            type="text"
                            
                            error={errorEmail}
                            sx={fieldStyle}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            //value={password}
                            type="password"
                            onBlur={(event)=>{setTimeout(() => {
                                if(!event.target.value  || event.target.value.length < 8){
                                    setErrorPassword(true)
                                }else{
                                    
                                    setErrorPassword(false)
                                    setPassword(event.target.value)

                                }
                            }, 1000);}}
                            onChange={(event)=>{setTimeout(() => {
                                if(!event.target.value  || event.target.value.length < 8){
                                    setErrorPassword(true)
                                }else{
                                    
                                    setErrorPassword(false)
                                    setPassword(event.target.value)

                                }
                            }, 1000);}}
                            id='password'
                            variant="outlined"
                            error = {errorPassword}
                            sx={fieldStyle}
                            helperText="Composé d'au moin 8 caracteres aplanumeriques (nombre, symble, lettres)"
                        >
                        </TextField>
                    </Grid>
                    
                    
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color='primary'
                            sx={BtnStyle}
                            onClick={register}
                        ><b style={{color : 'white'}}>Inscription</b></Button>
                    </Grid>
                    <Grid item xs={12}>
                        <svg width="158" height="2" viewBox="0 0 158 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="-1.859e-05" y1="1.5" x2="158" y2="1.49413" stroke="#96A5A6" stroke-opacity="0.46"/>
                        </svg>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.38734 5.90909C9.38734 6.98295 9.19345 7.91098 8.80566 8.69318C8.41788 9.47538 7.88592 10.0786 7.20978 10.5028C6.53365 10.9271 5.76139 11.1392 4.89302 11.1392C4.02465 11.1392 3.2524 10.9271 2.57626 10.5028C1.90012 10.0786 1.36816 9.47538 0.98038 8.69318C0.592596 7.91098 0.398704 6.98295 0.398704 5.90909C0.398704 4.83523 0.592596 3.9072 0.98038 3.125C1.36816 2.3428 1.90012 1.73958 2.57626 1.31534C3.2524 0.891098 4.02465 0.678977 4.89302 0.678977C5.76139 0.678977 6.53365 0.891098 7.20978 1.31534C7.88592 1.73958 8.41788 2.3428 8.80566 3.125C9.19345 3.9072 9.38734 4.83523 9.38734 5.90909ZM8.19416 5.90909C8.19416 5.02746 8.04667 4.28338 7.75169 3.67685C7.46002 3.07031 7.06395 2.61127 6.56348 2.29972C6.06632 1.98816 5.5095 1.83239 4.89302 1.83239C4.27654 1.83239 3.71807 1.98816 3.2176 2.29972C2.72044 2.61127 2.32437 3.07031 2.02939 3.67685C1.73772 4.28338 1.59189 5.02746 1.59189 5.90909C1.59189 6.79072 1.73772 7.5348 2.02939 8.14134C2.32437 8.74787 2.72044 9.20691 3.2176 9.51847C3.71807 9.83002 4.27654 9.9858 4.89302 9.9858C5.5095 9.9858 6.06632 9.83002 6.56348 9.51847C7.06395 9.20691 7.46002 8.74787 7.75169 8.14134C8.04667 7.5348 8.19416 6.79072 8.19416 5.90909ZM11.3014 11V3.36364H12.4349V4.51705H12.5145C12.6537 4.1392 12.9056 3.83262 13.2702 3.5973C13.6347 3.36198 14.0457 3.24432 14.5031 3.24432C14.5893 3.24432 14.697 3.24597 14.8263 3.24929C14.9555 3.2526 15.0533 3.25758 15.1196 3.2642V4.45739C15.0798 4.44744 14.9887 4.43253 14.8461 4.41264C14.7069 4.38944 14.5595 4.37784 14.4037 4.37784C14.0325 4.37784 13.701 4.45573 13.4094 4.61151C13.121 4.76397 12.8923 4.97609 12.7233 5.24787C12.5576 5.51634 12.4747 5.82292 12.4747 6.16761V11H11.3014Z" fill="#96A5A6"/>
                        </svg>
                        <svg width="158" height="1" viewBox="0 0 158 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1.49201e-10" y1="0.5" x2="158" y2="0.5" stroke="#96A5A6" stroke-opacity="0.46"/>
                        </svg>
                    </Grid>
                    <Grid item xs={12}>
                        <IconButton
                            sx={BtnStyle}
                            color="secondary"
                        >
                            <img src="gg.png" width={40}/>
                        </IconButton>
                        
                    </Grid>

                    <DailogPage 
                        open={openDialog}
                        handleClose={handleClose}
                        content={content}
                    ></DailogPage>

                </ThemeProvider>
            </Grid>
            
        </Container>
       
            

        </>
    );
} 
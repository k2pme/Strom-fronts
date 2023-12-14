import {TextField, Grid, Button, Container,IconButton} from '@mui/material';
import {useState, useEffect, useRef, useContext} from 'react';
import { KiosqueStandarsColors, secondaryText } from '../Styles/Colors';
import { loginContainers, loginContainers_phone, login, contain } from '../Styles/Containers';
import { fieldStyle } from '../Styles/Fields';
import { BtnStyle, gpBtn } from '../Styles/Buttons';
import {createTheme, ThemeProvider} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AppContext } from './AppContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export default function LoginPage(){
   
    const {online} = useContext(AppContext);
    const navigate = useNavigate()
        
    
    
    


    const [visible, setVisible] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setErrorMessage] = useState(null)
    const [severity, setSeverity] = useState(null)



    const handleConnexion= async ()=>{
        
        setEmail(document.getElementById('1').value);
        setPassword(document.getElementById('2').value)
    

        if(email && password){
            try {
                const res = await axios.post("http://localhost:4002/login", 
                                {
                                    email, 
                                    password,
                                }, 
                                {
                                    
                                    withCredentials : true,
                                    
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer your_token_here',
                                      }
                                }
                                );
                                
               
                if(online){
                    setErrorMessage("Vous ete connecter")
                    setSeverity('success')
                    setOpenSnackbar(true)
                }else{
                    setErrorMessage("Cet utilisateur n'est pas Connu, inscrivez vous !")
                    setSeverity('info')
                    setOpenSnackbar(true)
                }
                
                                
                                

                //alert(res.data)
            }catch(error){
                setErrorMessage("le Service est indisponible en ce moment\nconsulter votre boite mail pour plus d'information")
                setSeverity('error')
                setOpenSnackbar(true)
                alert(error)
            }

        
            
        } else {
            setErrorMessage("Inser vos données de connexion")
            setSeverity('warning')
            setOpenSnackbar(true)
        }
            
        }


    


    return (
        <>
        <Container  sx={login}>
            
                <Grid container spacing={4} alignItems={"center"} justifyContent={"center"} direction={"column"}>
                    <ThemeProvider theme={KiosqueStandarsColors}>
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
                    <Grid item xs={12}>
                        <h2>Bienvenue sur Strom </h2>

                        
                        
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name='email'
                            id='1'
                            type="email"
                            variant="outlined"
                            sx={fieldStyle}

                            onBlur={(event)=>{
                                setEmail(event.target.value)
                            }}

                            onChange={(event)=>{
                                setEmail(event.target.value)
                            }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type='password'
                            variant="outlined"
                            sx={fieldStyle}
                            id='2'

                            onBlur={(event)=>{
                                setPassword(event.target.value)
                            }}

                            onChange={(event)=>{
                                setPassword(event.target.value)
                            }}
                        >
                        </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={BtnStyle}
                            onClick={handleConnexion}
                        ><b style={{color : 'white'}}>Connexion</b></Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="text"
                            color='success'
                            sx={{marginLeft : '100px'}}
                        ><b>Mot de passe oublier ?</b></Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="info"
                            sx={BtnStyle}
                            onClick={()=>{navigate('/signin')}}
                        ><b>M'inscrire plutot</b></Button>
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
                    


                </ThemeProvider>
            </Grid>
            
        </Container>
       
            

        </>
    );
} 
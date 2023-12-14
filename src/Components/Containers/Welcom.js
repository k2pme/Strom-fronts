import {TextField, Grid, Button, Container,IconButton} from '@mui/material';
import {useState, useEffect} from 'react';
import { KiosqueStandarsColors, secondaryText } from '../Styles/Colors';
import { loginContainers, loginContainers_phone, background, contain} from '../Styles/Containers';
import { fieldStyle } from '../Styles/Fields';
import { BtnStyle, gpBtn } from '../Styles/Buttons';
import {createTheme, ThemeProvider} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Welcome(){

    const navigate = useNavigate();

    return (
        <div sx={contain}>
            
            <div style={background}/>
            <Container sx={loginContainers}>
                    
                    <Grid container spacing={2} alignItems={"center"} justifyContent={"center"} direction={"column"}>
                        <ThemeProvider theme={KiosqueStandarsColors}>
                        
                        <Grid item xs={12}>
                            <svg width="80" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="27" cy="25.3623" rx="27" ry="25.3623" fill="#16067A" fill-opacity="0.8"/>
                                <ellipse cx="27" cy="25.3623" rx="27" ry="25.3623" fill="#16067A" fill-opacity="0.8"/>
                                <path d="M39 23.725V28.9378M17.25 19.8488L17.25 34.5516M24.9265 12.4974V25.7299V38.9624M32.1765 14.5023V36.5565" stroke="white" stroke-width="4" stroke-linecap="round"/>
                            </svg>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color='gentle_black'
                                sx={BtnStyle}
                                onClick={()=>{navigate('/login')}}
                            ><b style={{color : 'white'}}>Connexion</b></Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color='primary'
                                sx={BtnStyle}
                                onClick={()=>{navigate('/signin')}}
                            ><b style={{color : 'white'}}>Inscription</b></Button>
                        </Grid>

                        <Grid item xs={12}>
                            <p color='soft_text'>
                                En continuant<br/>
                                <Button
                                    variant='text'
                                    size='1px'
                                >
                                    Vous acceptez notre politique de confidentialité
                                </Button>
                            </p>
                        </Grid>


                    </ThemeProvider>
                    </Grid>
                
            </Container>
            
        </div>
    );
} 
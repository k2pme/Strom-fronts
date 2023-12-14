import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material/";
import { DialogContent } from "@mui/material";
import { BtnDialogStyle } from "../Styles/Buttons";



export default function DailogPage({open, handleClose, content}){

    return(
        <>
            <Dialog 
            open={open}
            //onClose={handleClose}
            maxWidth="xs"
            fullWidth
            style={{backdropFilter: 'blur(5px)'}}
            >

                <DialogContent>
                    {content}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color='primary'
                        sx={BtnDialogStyle}
                        onClick={handleClose}
                    >
                        Ok
                    </Button>
                </DialogActions>


            </Dialog>
        </>
    );

}
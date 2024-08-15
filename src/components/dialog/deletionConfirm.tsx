import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from "@mui/material";
import { DeleteDialogProps } from "../../utils/types";
import { Check, Replay, Warning } from "@mui/icons-material";

export const DeletionConfirmDialog = ({ children, open, handleClose, handleDeleteAll }: DeleteDialogProps) => {

    return (
        <>
            {children}
            <Dialog
                open={open}
                maxWidth={"xs"}
                fullWidth
                onClose={handleClose}
            >
                <DialogTitle display={"flex"} flexDirection={"row"} gap={1} alignItems={"center"} justifyContent={"center"}>
                    <Warning color="warning" /><Typography variant="h5"> Attention</Typography>
                </DialogTitle>
                <DialogContent >
                    <DialogContentText textAlign={"center"}>
                        Do you really want do delete the Family members? The action is not revertable.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="info" size="small" onClick={handleClose} startIcon={<Replay />}>No</Button>
                    <Button variant="contained" color="error" size="small" startIcon={<Check />} onClick={() => { handleDeleteAll(); handleClose(); }} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

}
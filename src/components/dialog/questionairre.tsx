import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { Add, Publish } from '@mui/icons-material';
import { API_URL } from '../../utils/consts';
import { QuestionairreDialogProps, Status } from '../../utils/types';

const Questionnaire = ({ load }: QuestionairreDialogProps) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [animals, setAnimals] = useState<any[]>([]);
    const [email, setEmail] = useState('');

    const [validFields, setValidFields] = useState(false);

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [text, setText] = useState("");
    const [status, setStatus] = useState<Status>("success");

    const [snackbarBorder, setSnackbarBorder] = useState("green");

    const resetValues = () => {
        setOpenDialog(false);
        setName("");
        setEmail("");
        setGender("");
        setAnimals([]);
        setValidFields(false);
    }

    const handleSubmit = () => {
        if (!validateFields()) {
            setValidFields(true);
            return;
        }
        axios.post(API_URL + '/submit', {
            name, gender, favoriteAnimals: animals.join(', '), email
        }).then(response => {
            setText(response.data.message);
            setStatus(response.data.status);
            setOpen(true);
            if (response.data.status !== "error") {
                load();
                resetValues();
            }
        })
            .catch(e => {
                setText(e.message);
                setStatus("error");
                setOpen(true);
            });

    };

    const handleAnimalChange = (animal: string) => {
        setAnimals(animals.includes(animal)
            ? animals.filter(a => a !== animal)
            : [...animals, animal]);
    };


    const validateFields = () => {
        if (!name || name.length < 2 || !email || !gender || !animals) return false;
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) return false;
        const names = name.split(" ");
        if (names.some(n => n.length < 2)) return false;
        return true;
    }

    useEffect(() => {
        switch (status) {
            case "success":
                setSnackbarBorder("green");
                break;
            case "warning":
                setSnackbarBorder("orange");
                break;
            case "error":
                setSnackbarBorder("red");
                break;
        }
    }, [status]);

    return (
        <>
            <IconButton size="small" color='success' onClick={() => setOpenDialog(true)}>
                <Add fontSize='small' />
            </IconButton>
            <Dialog
                maxWidth="xs"
                fullWidth
                open={openDialog}
                onClose={() => {
                    resetValues();
                }}
                sx={{
                    ".MuiPaper-root": {
                        backgroundColor: "lightgray"
                    }
                }}>
                <DialogTitle>New Member</DialogTitle>
                <DialogContent dividers >
                    <Stack direction={"column"} spacing={2}>
                        <Stack justifyContent={"space-between"} direction={"column"} spacing={1}>
                            <Typography variant='body1'>Name:</Typography>
                            <TextField
                                placeholder='Name...'
                                size="small"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                                error={validFields && name === ""}
                            />
                        </Stack>
                        <Stack justifyContent={"space-between"} direction={"column"}>
                            <Typography variant='body1'>Email:</Typography>
                            <TextField
                                placeholder='Email...'
                                type="email"
                                size="small"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                error={validFields && email === ""}
                            />
                        </Stack>
                        <Stack justifyContent={"space-between"} direction={"column"}>
                            <Typography variant='body1'>Gender:</Typography>
                            <RadioGroup row sx={{
                                ".MuiTypography-root": {
                                    color: validFields && gender === "" ? "red" : "black"
                                }
                            }}>
                                <FormControlLabel
                                    checked={gender === "male"}
                                    label={<Typography variant='caption'>Male</Typography>}
                                    control={<Radio size='small' />}
                                    name="gender"
                                    value="male"
                                    onChange={(e: any) => setGender(e.target.value)} />
                                <FormControlLabel
                                    checked={gender === "female"}
                                    label={<Typography variant='caption'>Female</Typography>}
                                    control={<Radio size='small' />}
                                    name="gender"
                                    value="female"
                                    onChange={(e: any) => setGender(e.target.value)} />
                                <FormControlLabel
                                    checked={gender === "diverse"}
                                    label={<Typography variant='caption'>Diverse</Typography>}
                                    control={<Radio size='small' />}
                                    name="gender"
                                    value="diverse"
                                    onChange={(e: any) => setGender(e.target.value)} />
                            </RadioGroup>
                        </Stack>
                        <Stack justifyContent={"space-between"} direction={"column"}>
                            <Typography variant='body1'>Favorite Animals:</Typography>
                            <Box style={{ color: validFields && animals.length === 0 ? "red" : "black" }}>
                                <FormControlLabel
                                    label={<Typography variant='caption'>Dog</Typography>}
                                    control={
                                        <Checkbox size='small'
                                            checked={animals.includes("dog")}
                                            value="dog"
                                            onChange={() => handleAnimalChange('dog')}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label={<Typography variant='caption'>Cat</Typography>}
                                    control={
                                        <Checkbox size='small'
                                            checked={animals.includes("cat")}
                                            value="cat"
                                            onChange={() => handleAnimalChange('cat')}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label={<Typography variant='caption'>Bunny</Typography>}
                                    control={
                                        <Checkbox size='small'
                                            checked={animals.includes("bunny")}
                                            value="bunny"
                                            onChange={() => handleAnimalChange('bunny')}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label={<Typography variant='caption'>Pony</Typography>}
                                    control={
                                        <Checkbox size='small'
                                            checked={animals.includes("pony")}
                                            value="pony"
                                            onChange={() => handleAnimalChange('pony')}
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label={<Typography variant='caption'>Fish</Typography>}
                                    control={
                                        <Checkbox size='small'
                                            checked={animals.includes("fish")}
                                            value="fish"
                                            onChange={() => handleAnimalChange('fish')} />
                                    }
                                />
                            </Box>
                        </Stack>
                    </Stack>
                    {validFields && <Typography variant='body1' textAlign={"start"} fontWeight={"bold"}>Invalid / empty data. Please check again.</Typography>}
                </DialogContent>
                <DialogActions sx={{ justifyContent: "end" }}>
                    <Button startIcon={<Publish />} color='success' variant='contained' size='small' onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                    ".MuiPaper-root": {
                        backgroundColor: "white",
                        color: "black",
                        borderLeft: "5px solid " + snackbarBorder
                    }
                }}
                open={open}
                message={text}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default Questionnaire;

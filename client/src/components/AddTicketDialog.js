import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {useDispatch, useSelector} from "react-redux";
import {closeTicketDialog, saveTicket} from "../actions/ticketDialog.actions";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import *  as JwtParser from "../util/JwtParser";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
    },
    input: {
        width: 'full-width',
        margin: 20,
    },
    points: {
        marginTop: theme.spacing(10),
        minWidth: 120,
        width: 'fit-content',
        margin: 'auto'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
        width: 'fit-content',
        margin: 'auto'
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    }
}));

export default function AddTicketDialog() {
    const API_URL = process.env.API_URL;
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector(state => state.ticketDialog.open);
    const teamMembers = useSelector(state => state.board.teamMembers);
    const currentSprint = useSelector(state => state.sprint.sprintNumber);
    const [projects, setProjects] = React.useState([]);
    const [selectedProject, setSelectedProject] = React.useState({});
    const [severity, setSeverity] = React.useState('');
    const [assignee, setAssignee] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [points, setPoints] = React.useState(0);

    useEffect(() => {
        const headers = {"Content-Type": "application/json"};
        axios.get(API_URL + "/board/projects/" + JwtParser.getUserId(), {headers})
            .then(res => {
                console.log('successfully got projects');
                console.log(res);
                setProjects(res.data.projects);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleClose = () => {
        dispatch(closeTicketDialog());
    };

    const handleSave = () => {
        dispatch(saveTicket({
            ticketTitle: title,
            severity: severity,
            status: 'backlog',
            sprintNumber: currentSprint,
            dateIssue: Date.now(),
            creatorId: JwtParser.getUserId(),
            assigneeId: assignee,
            projectId: selectedProject,
            points: points
        }));
        handleClose();
    }

    const handleChangeSeverity = event => {
        setSeverity(event.target.value);
    }

    const handleChangeAssignee = event => {
        setAssignee(event.target.value);
    }

    const handleChangeTitle = event => {
        setTitle(event.target.value);
    }

    const handleChangeProject = event => {
        setSelectedProject(event.target.value);
    }

    const handleChangePoints = event => {
        setPoints(event.target.value);
    }

    return (
        <Dialog
            fullWidth={'md'}
            maxWidth={'md'}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">Create a ticket</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill in the following fields to create a ticket.
                </DialogContentText>
                <form className={classes.form} noValidate>
                    <TextField
                        id='outlined-basic'
                        variant="outlined"
                        label="Title"
                        value={title}
                        onChange={handleChangeTitle}
                    />
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Severity</InputLabel>
                                <Select
                                    onChange={handleChangeSeverity}
                                    inputProps={{
                                        name: 'Severity',
                                        id: 'severity',
                                    }}
                                >
                                    <MenuItem value="high">high</MenuItem>
                                    <MenuItem value="medium">medium</MenuItem>
                                    <MenuItem value="low">low</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Assign To</InputLabel>
                                <Select
                                    onChange={handleChangeAssignee}
                                    inputProps={{
                                        name: 'Assignee',
                                        id: 'assignee',
                                    }}
                                >
                                    {teamMembers.map(tm => <MenuItem value={tm.id}>{tm.username}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Project</InputLabel>
                                <Select
                                    onChange={handleChangeProject}
                                    inputProps={{
                                        name: 'Severity',
                                        id: 'severity',
                                    }}
                                >
                                    {projects.map(p => <MenuItem value={p.projectId}>{p.projectName}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                classname={classes.points}
                                id="standard-number"
                                label="Points"
                                type="number"
                                value={points}
                                onChange={handleChangePoints}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} color="primary" autoFocus>
                    Save
                </Button>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
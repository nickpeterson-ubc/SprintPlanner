import React, {useEffect} from "react";
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {useDispatch, useSelector} from "react-redux";
import {
    getAllSprints,
    getAllTeamMembers,
    getNumOfUserWithTickets,
    getMaxPoints,
    setSprint
} from "../actions/userBoard.actions";
import UserBoard from "./UserBoard";

export default function TeamBoard({ teamId, teamName }) {
    const dispatch = useDispatch();
    const teamMembers = useSelector(state => state.board.teamMembers);
    const sprints = useSelector(state => state.board.sprints);
    const maxPoints = useSelector(state => state.board.maxPoints);
    const usersWithTickets = useSelector(state => state.board.usersWithTickets);
    const currentSprint = useSelector(state => state.sprint.sprintNumber);
    const currentProject = useSelector(state => state.sprint.belongsTo);

    useEffect(() => {
        const fetchTeamMembersAndSprints = () => {
            try {
                dispatch(getAllTeamMembers(teamId));
                dispatch(getAllSprints(teamId));
            } catch (e) {
                console.log(e);
                console.log("Unable to load teamMembers");
            }
        };
        fetchTeamMembersAndSprints();
    }, [teamId]);

    const handleChange = (event) => {
        dispatch(setSprint(sprints.find(s => s.projectName + " - Sprint " + s.sprintNumber === event.target.value)));
    };

    const getMaxSumOfPoints = () => {
        dispatch(getMaxPoints(currentSprint, currentProject));
        return maxPoints ?? 0;
    };

    const getNumberOfUsersWithTickets = () => {
        dispatch(getNumOfUserWithTickets(currentSprint, currentProject));
        return usersWithTickets;
    };

    return (
        <div style={{marginBottom: 100}}>
            <FormControl>
                <InputLabel>Sprint Number</InputLabel>
                <Select
                    value={currentSprint}
                    onChange={handleChange}
                    style={{
                        minWidth: 150,
                        alignContent: 'center', marginBottom: 30
                    }}>
                    {sprints.map((sprint, index) => <MenuItem key={index} value={sprint.projectName + " - Sprint " + sprint.sprintNumber}>{sprint.projectName + " - Sprint " + sprint.sprintNumber}</MenuItem>)}
                </Select>
            </FormControl>
            <Grid container direction="row">
                {currentSprint &&
                <Grid item>
                    <Typography component="h6" variant="button">Max Number of Points a User took: {getMaxSumOfPoints() ?? 0}</Typography>
                </Grid>}
                {currentSprint &&
                <Grid item>
                    <Typography style={{marginLeft: 30}} component="h6" variant="button">Number of Members with Tickets: {getNumberOfUsersWithTickets() ?? 0} </Typography>
                </Grid>
                }
            </Grid>
            {currentSprint && teamMembers.map((tm) => <UserBoard key={tm.id} userId={tm.id} sprintId={currentSprint} projectId={currentProject} username={tm.username} />)}
        </div>
    )

}
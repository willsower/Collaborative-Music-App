import React, { Component } from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    // Check the life cycle before react code loads
    // Here we want to see if user session has been in room previously
    // Doing an asynchronous call in this component (don't need to wait on this function)
    async componentDidMount() {
        fetch("/api/user-in-room")
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code
                });
            });
    }

    // React that creates the basic home page section
    renderHomePage() {
        return(
            <Grid container spacing = {3}>
                <Grid item xs = {12} align = "center">
                    <Typography variant = "h3" compact = "h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <ButtonGroup disableElevation variant = "contained" color = "primary">
                        <Button color = "primary" to="/join" component = {Link}>
                            Join a Room
                        </Button>
                        <Button color = "secondary" to="/create" component = {Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    // Make sure our room / state is cleared => reset state
    clearRoomCode() {
        this.setState({
            roomCode: null,
        });
    }

    // React that creates home page (from render Home Page) and facilitates the anchor tags
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path = "/" render = {() => {
                        return this.state.roomCode ? (<Redirect to = {`/room/${this.state.roomCode}`}></Redirect>) : this.renderHomePage()
                    }}/>
                    <Route path = "/join" component = {RoomJoinPage}></Route>
                    <Route path = "/create" component = {CreateRoomPage}></Route>
                    <Route 
                        path = "/room/:roomCode" 
                        render = {(props) => {
                            return <Room {...props} leaveRoomCallback = {this.clearRoomCode}></Room>;
                        }}
                    />
                </Switch>
            </Router>
        )
    }
}
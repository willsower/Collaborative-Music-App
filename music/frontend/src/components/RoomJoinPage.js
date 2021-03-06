import React, { Component } from 'react';
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
    // Constructor that sets state and binds functions (so we can use this.func)
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        }
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonPressed = this.roomButtonPressed.bind(this);
    }

    // Basic React code that renders join room page for a user
    render() {
        return (
            <Grid container spacing = {1}>
                <Grid item xs = {12} align = "center">
                    <Typography variant = "h4" component = "h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <TextField
                        error = { this.state.error }
                        label = "Code"
                        placeholder = "Enter a Room Code"
                        value = { this.state.roomCode }
                        helperText = { this.state.error }
                        variant = "outlined"
                        onChange = { this.handleTextFieldChange }
                    />
                </Grid>
                <Grid item xs = {12} align = "center">
                    <Button variant = "contained" color = "primary" onClick = {this.roomButtonPressed }>
                        Enter Room
                    </Button>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <Button variant = "contained" color = "secondary" to = "/" component = { Link }>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    // Get room code
    handleTextFieldChange(e) {
        this.setState({
            roomCode: e.target.value
        });
    }

    // Sends post request to see if room exists
    roomButtonPressed() {
        // Get the code
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        };

        // Send it
        fetch("/api/join-room", requestOptions).then((response) => {
            // If Response good
            if (response.ok) {
                this.props.history.push(`/room/${this.state.roomCode}`)
            // Else no room
            } else {
                this.setState({
                    error: "Room not found."
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    }
}
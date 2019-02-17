import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { connect } from 'react-redux';

class BulbCreate extends Component{
    state = {
        open: false,
        type: 'A',
        room: '',
        error: null
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            type: 'A',
            room: '',
            error: null
        });
    };

    handleRoomChange = (event) => {
        this.setState({
            room: event.target.value
        })
    }

    handleTypeChange = (event) => {
        this.setState({
            type: event.target.value
        })
    }

    handleSubmit = () => {
        axios.post('/api/create/bulb', {
            type: this.state.type,
            room: this.state.room
        }).then((res) => {
            if(res.data.success){
                this.props.addBulb(res.data)
                return this.handleClose()
            }else{
                this.setState({
                    error: res.data.error
                })
            }
        })
    }

    renderError = () => {
        if(this.state.error){
            return (
                <p>{this.state.error}</p>
            )
        }
    }

    render() {
        const {rooms} = this.props;
        
        let selectRoomOptions;

        //rooms will be equal to null before they are fetched
        if(rooms !== null){
            selectRoomOptions = rooms.map((room, index) => {
                return(
                    <MenuItem key={index} value={room.number}>{room.number}</MenuItem>
                )
            })
        }

        return (
            <div>
                <button className='btn btn-primary btn-lg ml-1' onClick={this.handleClickOpen}>
                    Add light bulb
                </button>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add light bulb</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Select the bulb type as well as the room it is placed in
                        </DialogContentText>
                        <InputLabel htmlFor="type-simple">Type</InputLabel>
                        <Select
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                            inputProps={{
                            name: 'type',
                            id: 'type-simple',
                            }}
                        >
                            <MenuItem value='A'>A</MenuItem>
                            <MenuItem value='B'>B</MenuItem>
                            <MenuItem value='C'>C</MenuItem>
                        </Select>
                        <InputLabel htmlFor="room-simple">Room</InputLabel>
                        <Select
                            value={this.state.room}
                            onChange={this.handleRoomChange}
                            inputProps={{
                            name: 'room',
                            id: 'room-simple',
                            }}
                        >
                            {selectRoomOptions}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                    {this.renderError()}
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        rooms: state.rooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addBulb: (data) => {
            dispatch({type: 'ADD_BULB', data: data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BulbCreate);
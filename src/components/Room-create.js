import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { connect } from 'react-redux';

class RoomCreate extends Component{
    state = {
        open: false,
        roomNumber: '',
        bulbs: {
            typeA: 0,
            typeB: 0,
            typeC: 0
        },
        error: null
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        //when close rest the state so that when opened again info that was previously enetered doesn't appear
        this.setState({ 
            open: false,
            roomNumber: '',
            bulbs: {
                typeA: 0,
                typeB: 0,
                typeC: 0
            },
            error: null
        });
    };

    handleRoomChange = (event) => {
        this.setState({
            roomNumber: event.target.value
        })
    }

    handleBulbsChange = (event) => {
        const id = event.target.id;
        let editBulbs = {...this.state.bulbs}
        editBulbs[id] = event.target.value
        this.setState({
            bulbs: editBulbs
        })
    }

    handleSubmit = () => {
        axios.post('/api/create/room', {
            room: this.state.roomNumber,
            bulbs: this.state.bulbs
        }).then((res) => {
            if(res.data.success){
                this.props.addRoom(res.data);
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

    render(){
        return (
            <div>
            <button className='btn btn-warning btn-lg' onClick={this.handleClickOpen}>
                Add room
            </button>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new room</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the room number and the number of light bulbs in it
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Room number"
                        type="text"
                        fullWidth
                        onChange={this.handleRoomChange}
                    />
                    <TextField
                        id="typeA"
                        label='Type A'
                        value={this.state.bulbs.typeA}
                        onChange={this.handleBulbsChange}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        />
                    <TextField
                        id="typeB"
                        label='Type B'
                        value={this.state.bulbs.typeB}
                        onChange={this.handleBulbsChange}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <TextField
                        id="typeC"
                        label='Type C'
                        value={this.state.bulbs.typeC}
                        onChange={this.handleBulbsChange}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Create
                    </Button>
                </DialogActions>
                {this.renderError()}
            </Dialog>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addRoom: (data) => {
            dispatch({type: 'ADD_ROOM', data: data})
        }
    }
}

export default connect(null, mapDispatchToProps)(RoomCreate);
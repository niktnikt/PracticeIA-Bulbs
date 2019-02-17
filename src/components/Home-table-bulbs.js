import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

class HomeTableBulbs extends Component{
    state = {
        dialogOpen: false,
        dialogBulb: null
    }

    handleClickOpen = (bulb) => {
        this.setState({ dialogOpen: true, dialogBulb: bulb });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    handleDelete = (bulb) => {
        axios.delete('/api/delete/bulb/' + bulb._id).then((res) => {
            if(res.data.success){
                const data = {
                    id: bulb._id,
                    room: res.data.room
                }
                this.props.deleteBulb(data);
                this.handleClose()
            }   
        })
    }

    handleSubmit = (bulb) => {
        axios.put('/api/edit/' + bulb._id).then((res) => {
            if(!res.data.error){
                this.props.editBulb(res.data)
                this.handleClose();
            }
        })
    }

    setStatus = (bulb) => {
        if(bulb.working){
            return 'fas fa-check text-success'
        }
        return 'fas fa-times text-danger'
    }

    expirationDate = (bulb) => {
        let newDate;
        if(bulb.type === 'A'){
            newDate = moment(bulb.date).add(10000, 'h');
        }else if(bulb.type === 'B'){
            newDate = moment(bulb.date).add(30000, 'h');
        }else{
            newDate = moment(bulb.date).add(5000, 'h');
        }
        return newDate.format('MMM Do YYYY');
    }

    render(){
        const {bulbs} = this.props;
        let renderBulbs;
        if(bulbs === null){
            renderBulbs = null;
        }else{
            renderBulbs = bulbs.map((bulb, index) => {
                return(
                    <tr key={index} onClick={() => {this.handleClickOpen(bulb)}}>
                        <th scope="row">{bulb.roomNumber}</th>
                        <td className='text-success'>{bulb.type}</td>
                        <td className='text-danger'><span className={this.setStatus(bulb)}></span></td>
                        <td>{this.expirationDate(bulb)}</td>
                    </tr>
                )
            })
        }

        return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Room</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderBulbs}
                    </tbody>
                </table>
                <InfoDialog handleDelete={this.handleDelete} handleSubmit={this.handleSubmit} expiration={this.expirationDate} bulb={this.state.dialogBulb} handleClose={this.handleClose} open={this.state.dialogOpen}></InfoDialog>
            </div>
        )
    }
}

const InfoDialog = (props) => {
    let {bulb} = props;
    const {handleClose} = props;
    const {open} = props;
    const {expiration} = props;
    const {handleSubmit} = props;
    const {handleDelete} = props;

    if(bulb === null){
        return null;
    }

    return(
        <div>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{`Room ${bulb.roomNumber} - bulb type: ${bulb.type}`}</DialogTitle>
            <DialogContent>
                <ul>
                    <li>{`Working: ${bulb.working}`}</li>
                    <li>{`Added on: ${moment(bulb.date).format('MMM Do YYYY')}`}</li>
                    <li>{`Expiration date: ${expiration(bulb)}`}</li>
                </ul>
                {/* <DialogContentText id="alert-dialog-description">
                </DialogContentText> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={() => {handleDelete(bulb)}} color="primary">
                Delete
                </Button>
                <Button onClick={() => {handleSubmit(bulb)}} color="primary" autoFocus>
                {bulb.working ? 'deactivate' : 'activate'}
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}

//Redux
const mapStateToProps = (state) => {
    return{
        bulbs: state.bulbs
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        editBulb: (data) => {
            dispatch({type: 'EDIT_BULB', data: data})
        },
        deleteBulb: (data) => {
            dispatch({type: 'DELETE_BULB', data: data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTableBulbs);

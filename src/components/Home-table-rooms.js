import React from 'react';
import { connect } from 'react-redux';

const HomeTableRooms = (props) => {
    const {rooms} = props;
    let renderRooms;

    const countOut = (room) => {
        let out = 0;
        for(let i = 0; i < room.bulbs.length; i++){
            if(room.bulbs[i].working === false){
                out++;
            }
        }
        return out;
    }

    const countWorking = (room) => {
        let working = 0;
        for(let i = 0; i < room.bulbs.length; i++){
            if(room.bulbs[i].working === true){
                working++;
            }
        }
        return working;
    }

    const checkStatus = (room) => {
        const out = countOut(room);
        if(out > 0){
            return 'fas fa-times text-danger'
        }
        return 'fas fa-check text-success'
    }

    if(rooms === null){
        renderRooms = null
    }else{
        renderRooms = rooms.map((room, index) => {
            return(
                <tr key={index}>
                    <th scope="row">{room.number}</th>
                    <td className='text-success'>{countWorking(room)}</td>
                    <td className='text-danger'>{countOut(room)}</td>
                    <td><span className={checkStatus(room)}></span></td>
                </tr>
            )
        })
    }

    return(
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Number</th>
                <th scope="col">Working</th>
                <th scope="col">Out</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {renderRooms}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    return{
        rooms: state.rooms
    }
}

export default connect(mapStateToProps)(HomeTableRooms);

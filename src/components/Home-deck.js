import React from 'react';
import Loader from './Loader';

const HomeDeck = (props) => {

    const {rooms} = props;
    const {bulbs} = props;

    const countWorking = () => {
        let count = 0;
        bulbs.forEach((bulb) => {
            if(bulb.working){
                count++
            }
        });
        return count;
    }

    const countOut = () => {
        let count = 0;
        bulbs.forEach((bulb) => {
            if(!bulb.working){
                count++
            }
        });
        return count;
    }

    const countRooms = () => {
        // let count = 0;
        // rooms.forEach((room) => {
        //     let allWorking = true;
        //     for(let i = 0; i < room.bulbs.length; i++){
        //         if(!room.bulbs[i].working){
        //             allWorking = false;
        //         }
        //     }
        //     if(allWorking){
        //         count++
        //     }
        // });
        return rooms.length;
    }


    //rooms and bulbs will be null before they are retrived
    if(rooms === null && bulbs === null){
        return <Loader></Loader>
    }

    return(
        <div className="card-deck text-center" style={{marginBottom: '2rem'}}>
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-success font-weight-bold">{countWorking()}</h1>
                    <p className="card-text"><small className="text-muted">Light bulbs working!</small></p>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-danger font-weight-bold">{countOut()}</h1>
                    <p className="card-text"><small className="text-muted">Light bulbs out!</small></p>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-info font-weight-bold">{countRooms()}</h1>
                    <p className="card-text"><small className="text-muted">Rooms</small></p>
                </div>
            </div>
        </div>
    )

}

export default HomeDeck;

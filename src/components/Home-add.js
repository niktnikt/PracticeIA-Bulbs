import React from 'react';
import RoomCreate from './Room-create';
import BulbCreate from './Bulb-create'

const HomeAdd = (props) => {
    return(
        <div className="add-div bg-light" style={{marginBottom: '2rem'}}>
            <div className="add-content align-middle">
                {/* <button className='btn btn-warning btn-lg'>Add light bulb</button> */}
                <RoomCreate></RoomCreate>
                {/* <button className='btn btn-primary btn-lg ml-1'>Add light bulb</button> */}
                <BulbCreate></BulbCreate>
            </div>
        </div>
    )
}

export default HomeAdd
import React from 'react';
import HomeTableRooms from './Home-table-rooms';
import Loader from './Loader';
import HomeTableBulbs from './Home-table-bulbs';

const TableNav = (props) => {

    return(
        <div className='home-table-nav'>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="rooms-tab" data-toggle="tab" href="#rooms" role="tab" aria-controls="rooms" aria-selected="true">Rooms</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="bulbs-tab" data-toggle="tab" href="#bulbs" role="tab" aria-controls="bulbs" aria-selected="false">Light Bulbs</a>
                </li>
            </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="rooms" role="tabpanel" aria-labelledby="rooms-tab">
                    <HomeTableRooms></HomeTableRooms>
                </div>
                <div className="tab-pane fade" id="bulbs" role="tabpanel" aria-labelledby="bulbs-tab">
                    <HomeTableBulbs></HomeTableBulbs>
                </div>
            </div>
        </div>
    )
}

export default TableNav;    
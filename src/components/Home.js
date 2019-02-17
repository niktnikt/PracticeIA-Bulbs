import React, { Component } from 'react'
import HomeHeader from './Home-header';
import HomeDeck from './Home-deck';
import HomeTable from './Home-table-rooms';
import HomeAdd from './Home-add';
import HomeTableNav from './Home-table-nav';
import axios from 'axios';
import { connect } from 'react-redux';

class Home extends Component{

    render(){
        const {rooms} = this.props;
        const {bulbs} = this.props;
        return(
            <div className="home">
                <div className='home-body'>
                    <HomeHeader></HomeHeader>
                    <HomeDeck rooms={rooms} bulbs={bulbs}></HomeDeck>
                    <HomeAdd></HomeAdd>
                    <HomeTableNav rooms={rooms} bulbs={bulbs}></HomeTableNav>
                </div>
            </div>    
        )
    }
}

//get bulbs and rooms from redux store
const mapStateToProps = (state) => {
    return {
        bulbs: state.bulbs,
        rooms: state.rooms
    }
}

export default connect(mapStateToProps)(Home);
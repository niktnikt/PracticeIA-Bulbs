const initState = {
    bulbs: null,
    rooms: null
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'GET_DATA'){
        return{
            ...state,
            bulbs: action.data.bulbs,
            rooms: action.data.rooms
        }
    }else if(action.type === 'ADD_ROOM'){
        return{
            ...state,
            rooms: [...state.rooms, action.data.room],
            bulbs: [...state.bulbs, ...action.data.bulbs]
        }
    }else if(action.type === 'ADD_BULB'){
        //find old room and change for the updated one
        let editRooms = [...state.rooms];
        //find the old version of the lightbulb
        const roomIds = editRooms.map((room) => {
            return room._id
        });
        const index = roomIds.indexOf(action.data.room._id)
        
        //swap
        editRooms[index] = action.data.room
        return{
            ...state,
            bulbs: [...state.bulbs, action.data.bulb],
            rooms: editRooms
        }
    }
    else if(action.type === 'EDIT_BULB'){
        //find old room and change for the updated one
        let editRooms = [...state.rooms];
        //find the old version of the room
        const roomIds = editRooms.map((room) => {
            return room._id
        });
        const index = roomIds.indexOf(action.data.room._id)
        //swap
        editRooms[index] = action.data.room;

        //find old bulb and change for the updated ne
        let editBulbs = [...state.bulbs];
        //find the old version fo the bulb
        const bulbIds = editBulbs.map((bulb) => {
            return bulb._id
        });
        const bulbIndex = bulbIds.indexOf(action.data.bulb._id);
        editBulbs[bulbIndex] = action.data.bulb;

        return{
            ...state,
            bulbs: editBulbs,
            rooms: editRooms
        }
    }else if(action.type === 'DELETE_BULB'){
        //find the bulb and delete it
        let editBulbs = [...state.bulbs];
        const bulbIds = editBulbs.map((bulb) => {
            return bulb._id
        });
        const index = bulbIds.indexOf(action.data.id);
        editBulbs.splice(index, 1);


        //change the room with the udated one
        let editRooms = [...state.rooms];
        //find the old version of the room
        const roomIds = editRooms.map((room) => {
            return room._id
        });
        const roomIndex = roomIds.indexOf(action.data.room._id);
        //swap
        editRooms[roomIndex] = action.data.room;
        console.log(editRooms)

        return{
            ...state,
            bulbs: editBulbs,
            rooms: editRooms
        }
    }
    return state;
}

export default rootReducer;
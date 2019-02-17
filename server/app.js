const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const mongoose = require('mongoose');
const Room = require('./models/room-model.js');
const Bulb = require('./models/bulb-model.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/Bulb', {useNewUrlParser: true});

app.use(urlencodedParser);
app.use(bodyParser.json());

app.get('/api', async (req, res) => {
    const bulbs = await Bulb.find({});
    const rooms = await Room.find({}).populate('bulbs');
    res.json({
        bulbs: bulbs,
        rooms: rooms
    })
});

//adding light bulbs
app.post('/api/create/bulb', async (req, res) => {
    try{
        const bulb = new Bulb({
            type: req.body.type,
            roomNumber: req.body.room,
            date: new Date().toISOString()
        })
        const savedBulb = await bulb.save();
        const room = await Room.findOne({number: req.body.room});
        room.bulbs.push(savedBulb.id)
        const savedRoom = await room.save()
        const roomSend = await Room.populate(savedRoom, 'bulbs')
        return res.json({
            success: true,
            bulb: savedBulb,
            room: roomSend
        })
    }catch(e){
        console.log(e)
        return res.json({
            error: 'Sorry and error occured',
            success: true
        })
    }
});

//adding rooms
app.post('/api/create/room', async (req, res) => {
    try{

        //check if a room with this number already exists
        const roomExists = await Room.findOne({number: req.body.room});
        if(roomExists){
            return res.json({
                error: 'Sorry this room already exists'
            })
        }

        //create the id for the room - the bulbs will have to have it added before the room even exists
        const roomId = mongoose.Types.ObjectId();

        //create all the bulbs
        const A = parseInt(req.body.bulbs.typeA);
        const B = parseInt(req.body.bulbs.typeB);
        const C = parseInt(req.body.bulbs.typeC);

        let documents = [];

        for(let i = 0; i < A; i++){
            documents.push({
                type: 'A',
                room: roomId,
                date: new Date().toISOString(),
                roomNumber: req.body.room
            })
        }
        for(let i = 0; i < B; i++){
            documents.push({
                type: 'B',
                room: roomId,
                date: new Date().toISOString(),
                roomNumber: req.body.room
            })
        }
        for(let i = 0; i < C; i++){
            documents.push({
                type: 'C',
                room: roomId,
                date: new Date().toISOString(),
                roomNumber: req.body.room
            })
        }

        const ids = [];

        //save the bulbs
        const savedBulbs = await Bulb.insertMany(documents);
        savedBulbs.forEach((bulb) => {
            ids.push(bulb._id)
        })

        //create the room
        const room = new Room({
            number: req.body.room,
            bulbs: ids,
            _id: roomId
        })
        const savedRoom = await room.save();
        
        return res.json({
            success: true,
            room: savedRoom,
            bulbs: savedBulbs
        })

    }catch(e){
        return res.json({
            error: 'Sorry an error occured'
        })
    }
});

//Edditing bulbs
app.put('/api/edit/:id', async (req, res) => {
    try{
        const bulb = await Bulb.findById(req.params.id);
        bulb.working = !bulb.working;
        const savedBulb = await bulb.save();
        //re-populate the bulb's room and send it
        const room = await Room.findById(savedBulb.room).populate('bulbs');
        return res.json({
            bulb: savedBulb,
            room: room
        })
    }catch(e){
        return res.json({
            error: 'Sorry an error occured'
        })
    }
});

//Deleting bulbs
app.delete('/api/delete/bulb/:id', async (req, res) => {
    try{
        //delete the bulb
        const bulb = await Bulb.findByIdAndDelete(req.params.id);
        
        //delete the bulb from the room
        const room = await Room.findById(bulb.room)
        let index;
        for(let i = 0; i < room.bulbs.length; i++){
            if(room.bulbs[i] == req.params.id){
                index = i;
                break;
            }
        }
        room.bulbs.splice(index, 1);
        const savedRoom = await room.save();

        //re-populate room
        const roomSend = await Room.populate(savedRoom, 'bulbs');


        return res.json({
            success: true,
            room: roomSend
        })
    }catch(e){
        return res.json({
            error: 'Sorry an error occured'
        })
    }
})

app.listen(5000, () => {
    console.log('running on port 5000');
})
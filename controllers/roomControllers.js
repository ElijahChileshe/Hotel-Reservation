// import rooms from "../models/rooms"
const rooms = require("../models/rooms")
import APIFeatures from "../utils/apiFeatures";
// const APIFeatures =  require("../utils/apiFeatures")


// create new room
const newRoom = async (req, res) => {

    try {

        const room = await rooms.create(req.body);

        res.status(200).json({
            success: true,
            room
        })
        
    } catch (error) {
        
        res.status(400).json({
            success: false,
            error: error.message
        })

    }
    
}

// Get all rooms
const allRooms = async (req, res) => {
    const resPerPage = 4;
    try {
        // Count total rooms
        const roomCount = await rooms.countDocuments();

        // Apply initial filtering and sorting
        const initialFeatures = new APIFeatures(rooms.find(), req.query)
            .search()
            .filter();

        // Get filtered rooms count
        const filteredRooms = await initialFeatures.query;
        const filteredRoomsCount = filteredRooms.length;

        // Apply pagination
        const paginatedFeatures = new APIFeatures(rooms.find(initialFeatures.query._conditions), req.query)
            .pagination(resPerPage);

        // Get paginated rooms
        const displayRooms = await paginatedFeatures.query;

        res.status(200).json({
            success: true,
            roomCount,
            resPerPage,
            filteredRoomsCount,
            displayRooms
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


// Get 1 room

const getSingleRoom = async (req, res, next) => {

    try {

        const displayRooms = await rooms.findById(req.query.id)

        if(!displayRooms) {
            res.status(400).json({
                success: false,
                error: "No room with that ID is found"
            })

        }

        res.status(200).json({
            success: true,
            displayRooms
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }

}


// Update room

const updateRoom = async (req, res) => {

    try {

        let displayRooms = await rooms.findById(req.query.id)

        if(!displayRooms) {
            res.status(400).json({
                success: false,
                error: "No room with that ID is found"
            })
        }

        displayRooms = await rooms.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            displayRooms
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }

}



// Delete room

const deleteRoom = async (req, res) => {

    try {

        let displayRooms = await rooms.findById(req.query.id)

        if(!displayRooms) {
            res.status(400).json({
                success: false,
                error: "No room with that ID is found"
            })
        }

        displayRooms = await rooms.findByIdAndDelete(req.query.id)

        res.status(200).json({
            success: true,
            message: 'Room successfully deleted'
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }

}







export {allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom}
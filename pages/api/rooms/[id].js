import {createRouter} from 'next-connect';
import { getSingleRoom, updateRoom, deleteRoom } from "../../../controllers/roomControllers"
import dbConnect from '../../../config/dbConnect';

const router = createRouter();

dbConnect()

router.get(getSingleRoom)
router.put(updateRoom)
router.delete(deleteRoom)

export default router.handler();

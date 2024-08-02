import {createRouter} from 'next-connect';
import { allRooms, newRoom } from "../../../controllers/roomControllers"
import dbConnect from '../../../config/dbConnect';

const router = createRouter();

dbConnect()

router.get(allRooms)
router.post(newRoom)

export default router.handler();

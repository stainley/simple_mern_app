import express from "express";
import cors from "cors";

import {getContests, getContestsById} from "../controller/apiController";

const router = express.Router();
router.use(cors());

router.get('/contests', getContests);

router.get('/contests/:contestId', getContestsById);

export default router;

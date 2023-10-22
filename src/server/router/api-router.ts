import express from "express";
import cors from "cors";

import {getContests, getContestsById, proposeNewName} from "../controller/apiController";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get('/contests', getContests);

router.get('/contests/:contestId', getContestsById);

router.post('/contests/:contestId', proposeNewName);

export default router;

import {Request, Response} from "express";
import {connectClient} from "../db";

export const getContests = async (req: Request, res: Response) => {
    const client = await connectClient();

    const contests = await client.collection("contests")
        .find()
        .project({
            id: 1,
            categoryName: 1,
            contestName: 1,
            _id: 0
        })
        .toArray();

    res.send({contests: contests});
};

export const getContestsById = async (req: Request, res: Response) => {
    const client = await connectClient();

    const contests = await client.collection("contests")
        .findOne({id: req.params.contestId });


    res.send({contests});
};
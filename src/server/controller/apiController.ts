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
        .findOne({id: req.params.contestId});


    res.send({contests});
};

export const proposeNewName = async (req: Request, res: Response) => {
    const client = await connectClient();

    const {newNameValue} = req.body;
    const newId = newNameValue.toLowerCase().replace(/\s/, '-');
    console.log(newId);
    const doc = await client.collection("contests")
        .findOneAndUpdate(
            {id: req.params.contestId},
            {
                $push: {
                    names: {
                        id: newId,
                        name: newNameValue,
                        timestamp: new Date(),
                    }
                }
            },
            {returnDocument: "after"}
        );


    res.send({updatedContest: doc});
};

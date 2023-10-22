import {useEffect, useState} from "react";
import {fetchContest} from "../api-client";
import Header from "./header";

const Contest = ({initialContest, onContestListClick}) => {

    const [contest, setContest] = useState({
        contestName: "",
        description: ""
    });
    useEffect(() => {
        fetchContest(initialContest.id).then((data) => {
            setContest(data.contests);
        })

    }, [initialContest.id]);

    const handleClickContestList = (event) => {
        event.preventDefault();
        onContestListClick();
    };

    return (
        <>
            <Header message={contest.contestName}/>
            <div className="contest">
                <div className="title">Contest Description</div>
                <div className="description">{contest.description}</div>
            </div>

            <a href="/" className="link" onClick={handleClickContestList}>
                Contest List
            </a>
        </>
    );
}

export default Contest;
import ContestPreview from "./contest-preview";
import {Suspense, useEffect, useState} from "react";
import {fetchContests} from "../api-client";
import Header from "./header";

const ContestList = ({initialContests, onContestClick}) => {

    const [contents, setContents] = useState(Array.isArray(initialContests) ? initialContests : []);
    useEffect(() => {
        if (!initialContests) {
            fetchContests()
                .then((data) => {
                    setContents(data.contests);
                });
        }

    }, [initialContests]);

    return (
        <>
            <Suspense fallback={<Loading/>}>
                <Header message="Naming Contest"/>
                <div className="content-list">

                    {
                        contents.map((contest) => {
                            return <ContestPreview key={contest.id} contest={contest} onClick={onContestClick}/>
                        })}
                </div>
            </Suspense>
        </>
    );
};

function Loading() {
    return <h2>🌀 Loading...</h2>;
}

export default ContestList;
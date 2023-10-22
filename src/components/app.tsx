import ContestList from "./contest-list";
import {useEffect, useState} from "react";
import Contest from "./contest";


const App = ({initialData}) => {
    // useState()
    const [page, setPage] = useState<"contestList" | "contest">(
        initialData.currentContest ? "contest" : "contestList"
    );
    const [currentContest, setCurrentContest] = useState<object | undefined>(initialData.currentContest?.id);

    useEffect(() => {
        window.onpopstate = (event) => {
            const newPage = event.state?.contestId ? "contest" : "contestList";
            setPage(newPage);
            setCurrentContest({id: event.state?.contestId});
        };
    }, []);

    const navigateToContest = (contestId) => {
        window.history.pushState({contestId}, "", `/contests/${contestId}`);
        setPage("contest");
        setCurrentContest({id: contestId});
    };

    const navigateToContestList = () => {
        window.history.pushState({}, "", '/');
        setPage("contestList");
        setCurrentContest(undefined);
    };

    const pageContest = () => {
        switch (page) {
            case "contestList":
                return <ContestList initialContests={initialData.contests}
                                    onContestClick={navigateToContest}
                />;
            case "contest":
                return <Contest
                    initialContest={currentContest}
                    onContestListClick={navigateToContestList}/>
        }
    };


    return (
        <div className="container">  {pageContest()} </div>
    );
};

export default App;

import {fetchContest, fetchContests} from "../api-client";
import App from "../components/app";
import ReactDOMServer from "react-dom/server";

const ServerRender = async (req) => {
    const {contestId} = req.params;

    const initialData = contestId ? {
        currentContest: await fetchContest(contestId)
    } : {
        contests: await fetchContests()
    }

    const initialMarkup = ReactDOMServer.renderToString(
        <App initialData={initialData}/>
    );

    return {initialMarkup, initialData};
};

export default ServerRender;
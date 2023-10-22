import * as React from "react";

const ContestPreview = ({contest, onClick}) => {

    const handleClick = (event) => {
        event.preventDefault();

        onClick(contest.id);
    };

    return (
        <div className="content-preview link" onClick={handleClick}>
            <div className="category">{contest.categoryName}</div>
            <div className="contest">{contest.contestName}</div>
        </div>
    );
};

export default ContestPreview;
import React from 'react';

export const MsgStatus = (props) => {

    return (
        <div>
        <h1 className={props.gameStatus === "You Win" ? "text-success" : "text-danger"}>
            {props.gameStatus}
        </h1>
        <button className="btn btn-secondary"
            onClick={props.ReplayClick} >
            Replay Again?</button>
        </div>

        
    )// 
}

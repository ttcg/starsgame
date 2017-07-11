import React from 'react';

export const Button = (props) => {

    let verifyButton;

    switch (props.isWin) {
        case true:
            verifyButton = 
                <button className="btn btn-success"
                    onClick={props.acceptAnswer}>
                    <i className="fa fa-check"></i>
                </button>
            break;
        case false:
            verifyButton = 
                <button className="btn btn-danger">
                    <i className="fa fa-times"></i>
                </button>
            break;
        default:
            verifyButton = 
            <button className="btn" 
                disabled={props.chosenNumbers.length === 0}
                onClick={props.verifyClick}>=</button>
            break;
    }

    

    return (
        <div className="col-md-2 text-center">
            {verifyButton}
            <br /><br />
            <button className="btn btn-warning btn-sm"
                disabled={props.refreshTimes === 0}
                onClick={props.refreshClick}>
                <i className="fa fa-refresh refresh" /> {props.refreshTimes}
            </button>
        </div>
    )
}
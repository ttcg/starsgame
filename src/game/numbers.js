import React from 'react';
var _ = require('lodash');



export const Numbers = (props) => {

    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
        if (props.chosenNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    }
    


    return (
        <div className="card text-center" style={{border: "1px solid #ccc", padding: 5, margin: 10, clear: "both" }}>
            {Numbers.list.map((number, i) =>
            <span key={i} className={numberClassName(number)}
                onClick = {() => props.selectNumber(number)}
            >
                {number}
            </span>
            )}
        </div>
    )
}

Numbers.list =  _.range(1, 10);
